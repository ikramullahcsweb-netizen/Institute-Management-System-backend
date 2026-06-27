import mongoose from "mongoose";
import axios from "axios";

// Models Imports (User ke ilawa sab ke sath Model lagaya aur exact named export use kiya)
import { User } from "../models/user.model.js";
import { StudentModel } from '../models/Students.js';
import { TeacherModel } from '../models/Teacher.js';
import { WalletModel } from '../models/Wallets.js';

// Utils & Helpers Imports (Paths ko simple aur accurate relative kiya)
import { hashPassword, comparePassword } from '../helpers/auth.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Helper Function: Access aur Refresh Tokens generate karne ke liye
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// 1. TEST ROUTE
const test = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, "test is working"));
});

// 2. UNIVERSAL REGISTER USER (Role-based clean data allocation)
const registerUser = asyncHandler(async (req, res) => {
  const { 
    first_name, 
    last_name, 
    email_address, 
    mobile_no, 
    password, 
    role, 
    grade, 
    gender, 
    subject, 
    SecAnswer 
  } = req.body;

  // Validation
  if (!first_name?.trim() || !email_address?.trim() || !password?.trim()) {
    throw new ApiError(400, "First name, email, and password are required");
  }

//   if (password.length < 6) {
//     throw new ApiError(400, "Password should be minimum 6 characters long");
//   }

//   if (!SecAnswer?.trim()) {
//     throw new ApiError(400, "Security answer is required for password recovery");
//   }

  const existedUser = await User.findOne({
    email_address: email_address.toLowerCase(),
  });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const userRole = role || "student";

  // Check structure: Admin aur Manager ke liye irrelevant data nikal rahe hain
  const isStaffOrAdmin = userRole === "admin" || userRole === "manager";

  // Naya user object schema ke mutabik filter kar ke save hoga
  const user = await User.create({
    first_name,
    last_name,
    email_address: email_address.toLowerCase(),
    mobile_no,
    password,
    role: userRole,
    SecAnswer,
    // Agar admin/manager hai toh yeh fields drop ho jayengi, warna value save hogi
    grade: isStaffOrAdmin ? undefined : grade,          // Only for students/teachers if needed
    gender: isStaffOrAdmin ? undefined : gender,        
    subject: isStaffOrAdmin ? undefined : subject       // Only for teachers
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, `${userRole.toUpperCase()} registered successfully`));
});

// 3. UNIVERSAL LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  const { email_address, password } = req.body;

  if (!email_address || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({
    email_address: email_address.toLowerCase(),
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        `${loggedInUser.role.toUpperCase()} logged in successfully`,
      ),
    );
});

// 4. FORGOT PASSWORD
const forgotPasswordUser = asyncHandler(async (req, res) => {
  const { email_address, SecAnswer, newPassword } = req.body;

  if (!email_address || !SecAnswer || !newPassword) {
    throw new ApiError(400, "Email, Security Answer, and New Password are required");
  }

  const user = await User.findOne({ email_address: email_address.toLowerCase(), SecAnswer });

  if (!user) {
    throw new ApiError(400, "Wrong email or security answer");
  }

  user.password = newPassword; 
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Reset Successfully"));
});

// 5. GET CURRENT USER PROFILE
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

// 6. GET PROFILE BY ID
const getProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -refreshToken");
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

// 7. UPDATE PROFILE DETAILS (With safety checks for admin/manager)
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { first_name, last_name, email_address, mobile_no, gender, grade, subject, SecAnswer } = req.body;

  if (!first_name || !email_address) {
    throw new ApiError(400, "First name and email are required");
  }

  // Pehle user ka maujuda role check karte hain
  const existingUser = await User.findById(req.user?._id);
  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  const isStaffOrAdmin = existingUser.role === "admin" || existingUser.role === "manager";

  const updateData = {
    first_name,
    last_name,
    mobile_no,
    SecAnswer,
    email_address: email_address.toLowerCase(),
  };

  // Agar admin/manager nahi hai, tabhi yeh data db mein push hoga
  if (!isStaffOrAdmin) {
    updateData.gender = gender;
    updateData.grade = grade;
    updateData.subject = subject;
  } else {
    // Agar woh pehle se saved thay aur user ab admin ban chuka hai toh unhe unset (remove) kar do
    updateData.$unset = { gender: 1, grade: 1, subject: 1 };
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    isStaffOrAdmin ? { $set: updateData, $unset: { gender: 1, grade: 1, subject: 1 } } : { $set: updateData },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

// 8. VIEW ALL STUDENTS
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await User.find({ role: "student" }).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, students, "All students fetched successfully"));
});

// 9. VIEW ALL TEACHERS
const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await User.find({ role: "teacher" }).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, teachers, "All teachers fetched successfully"));
});

// 10. VIEW ALL MANAGERS
const getAllManagers = asyncHandler(async (req, res) => {
  const managers = await User.find({ role: "manager" }).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, managers, "All managers fetched successfully"));
});

// 11. VIEW ALL ADMINS
const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find({ role: "admin" }).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, admins, "All admins fetched successfully"));
});

// 12. DELETE A USER
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

// 13. LOGOUT USER
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true },
  );

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// 14. GOOGLE OAUTH SIGN-IN
const googleAuth = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(400, "Google access token is required");
  }

  let googleResponse;
  try {
    googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    throw new ApiError(401, "Invalid Google access token");
  }

  const { email, given_name, family_name } = googleResponse.data;

  if (!email) {
    throw new ApiError(400, "Email info not provided by Google");
  }

  let user = await User.findOne({ email_address: email.toLowerCase() });

  if (!user) {
    const randomPassword = Math.random().toString(36).slice(-10) + Date.now().toString(36);
    
    user = await User.create({
      first_name: given_name || "Google User",
      last_name: family_name || "",
      email_address: email.toLowerCase(),
      password: randomPassword,
      mobile_no: "",
      role: "student",
      SecAnswer: "GoogleAccount" 
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User authenticated successfully via Google"
      )
    );
});

export {
  test,
  registerUser,
  loginUser,
  forgotPasswordUser,
  getCurrentUser,
  getProfileById,
  updateAccountDetails,
  getAllStudents,
  getAllTeachers,
  getAllManagers,
  getAllAdmins,
  deleteUser,
  logoutUser,
  googleAuth
};