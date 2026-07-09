import { User } from "../models/user.model.js";
import { StudentModel } from "../models/Student.js";
import { TeacherModel } from "../models/Teacher.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

// Local development ke liye: secure false rakhein (http:// ke sath)
const cookieOptions = { httpOnly: true, secure: false, sameSite: "lax" };

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerAdminManager = asyncHandler(async (req, res) => {
  const { first_name, last_name, email_address, mobile_no, password, SecAnswer, role } = req.body;

  const allowedRoles = ["admin", "manager"];
  const userRole = allowedRoles.includes(role) ? role : "admin";

  if (!first_name?.trim() || !email_address?.trim() || !password?.trim()) {
    throw new ApiError(400, "First name, email, and password are required");
  }

  const existedUser = await User.findOne({ email_address: email_address.toLowerCase() });
  if (existedUser) throw new ApiError(409, "User with this email already exists");

  const user = await User.create({
    first_name,
    last_name,
    email_address: email_address.toLowerCase(),
    mobile_no,
    password,
    role: userRole,
    SecAnswer,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) throw new ApiError(500, "Something went wrong while registering");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, `${userRole.toUpperCase()} registered successfully `));
});

const loginAdminManager = asyncHandler(async (req, res) => {
  const { email_address, password } = req.body;

  if (!email_address || !password) throw new ApiError(400, "Email and password are required");

  const user = await User.findOne({ email_address: email_address.toLowerCase() });
  if (!user) throw new ApiError(404, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        `${loggedInUser.role.toUpperCase()} logged in successfully `
      )
    );
});

const forgotPasswordAdminManager = asyncHandler(async (req, res) => {
  const { email_address, SecAnswer, newPassword } = req.body;

  if (!email_address || !SecAnswer || !newPassword) {
    throw new ApiError(400, "Email, Security Answer, and New Password are required");
  }

  const user = await User.findOne({ email_address: email_address.toLowerCase(), SecAnswer });
  if (!user) throw new ApiError(400, "Wrong email or security answer");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully "));
});

const getCurrentAdminManager = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched successfully ✅"));
});

const updateAdminManager = asyncHandler(async (req, res) => {
  const { first_name, last_name, email_address, mobile_no, SecAnswer } = req.body;

  if (!first_name || !email_address) throw new ApiError(400, "First name and email are required");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { first_name, last_name, email_address: email_address.toLowerCase(), mobile_no, SecAnswer },
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) throw new ApiError(404, "User not found");
  return res.status(200).json(new ApiResponse(200, user, "Profile updated successfully "));
});

const logoutAdminManager = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logged out successfully "));
});

const getAllManagers = asyncHandler(async (req, res) => {
  const managers = await User.find({ role: "manager" }).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, managers, "All managers fetched successfully "));
});

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find({ role: "admin" }).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, admins, "All admins fetched successfully "));
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await StudentModel.find().select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, students, "All students fetched successfully "));
});

const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await TeacherModel.find().select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, teachers, "All teachers fetched successfully "));
});

const deleteAnyUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let deleted = await User.findByIdAndDelete(id);
  if (!deleted) deleted = await StudentModel.findByIdAndDelete(id);
  if (!deleted) deleted = await TeacherModel.findByIdAndDelete(id);

  if (!deleted) throw new ApiError(404, "User not found");
  return res.status(200).json(new ApiResponse(200, {}, "User deleted successfully "));
});

const googleAuth = asyncHandler(async (req, res) => {
  const { token, role } = req.body;

  if (!token) throw new ApiError(400, "Google access token is required");

  let googleResponse;
  try {
    googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new ApiError(401, "Invalid Google access token");
  }

  const { email, given_name, family_name } = googleResponse.data;
  if (!email) throw new ApiError(400, "Email not provided by Google");

  let user = await User.findOne({ email_address: email.toLowerCase() });

  if (!user) {
    const randomPassword = Math.random().toString(36).slice(-10) + Date.now().toString(36);
    user = await User.create({
      first_name: given_name || "Google User",
      last_name: family_name || "",
      email_address: email.toLowerCase(),
      password: randomPassword,
      mobile_no: "",
      role: role || "admin",
      SecAnswer: "GoogleAccount",
    });
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken }, "Google authentication successful "));
});

export {
  registerAdminManager,
  loginAdminManager,
  forgotPasswordAdminManager,
  getCurrentAdminManager,
  updateAdminManager,
  logoutAdminManager,
  getAllManagers,
  getAllAdmins,
  getAllStudents,
  getAllTeachers,
  deleteAnyUser,
  googleAuth,
};