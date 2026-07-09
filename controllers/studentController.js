import { StudentModel } from "../models/Student.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const cookieOptions = { httpOnly: true, secure: false, sameSite: "lax" };

const generateTokens = async (studentId) => {
  try {
    const student = await StudentModel.findById(studentId);
    const accessToken = student.generateAccessToken();
    const refreshToken = student.generateRefreshToken();
    student.refreshToken = refreshToken;
    await student.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// REGISTER — StudentRegister.jsx form se yahi call hota hai
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, contactnumber, grade, username, stdid, walletid, password } = req.body;

  if (!name?.trim() || !email?.trim() || !username?.trim() || !password?.trim()) {
    throw new ApiError(400, "Name, email, username, and password are required");
  }
  if (!grade?.trim() || !stdid?.trim()) {
    throw new ApiError(400, "Grade and Student ID are required");
  }

  const existedStudent = await StudentModel.findOne({
    $or: [{ email: email.toLowerCase() }, { stdid }, { username }],
  });
  if (existedStudent) {
    throw new ApiError(409, "Student with this email, username, or Student ID already exists");
  }

  const student = await StudentModel.create({
    name,
    email: email.toLowerCase(),
    contactnumber,
    grade,
    username,
    stdid,
    walletid,
    password,
  });

  const createdStudent = await StudentModel.findById(student._id).select("-password -refreshToken");
  if (!createdStudent) throw new ApiError(500, "Something went wrong while registering the student");

  return res.status(201).json(new ApiResponse(201, createdStudent, "Student registered successfully ✅"));
});

// LOGIN
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password are required");

  const student = await StudentModel.findOne({ email: email.toLowerCase() });
  if (!student) throw new ApiError(404, "Student does not exist");

  const isPasswordValid = await student.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateTokens(student._id);
  const loggedInStudent = await StudentModel.findById(student._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { student: loggedInStudent, accessToken }, "Student logged in successfully ✅"));
});

// FORGOT PASSWORD
const forgotPasswordStudent = asyncHandler(async (req, res) => {
  const { email, SecAnswer, newPassword } = req.body;
  if (!email || !SecAnswer || !newPassword) {
    throw new ApiError(400, "Email, Security Answer, and New Password are required");
  }

  const student = await StudentModel.findOne({ email: email.toLowerCase(), SecAnswer });
  if (!student) throw new ApiError(400, "Wrong email or security answer");

  student.password = newPassword;
  await student.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully ✅"));
});

// CURRENT LOGGED-IN STUDENT
const getCurrentStudent = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current student fetched successfully ✅"));
});

// GET ONE BY ID
const getStudentById = asyncHandler(async (req, res) => {
  const student = await StudentModel.findById(req.params.id).select("-password -refreshToken");
  if (!student) throw new ApiError(404, "Student not found");
  return res.status(200).json(new ApiResponse(200, student, "Student fetched successfully ✅"));
});

// GET ALL
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await StudentModel.find().select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, students, "All students fetched successfully ✅"));
});

// UPDATE — apna profile ya (admin ho toh) :id se kisi aur ka
const updateStudentDetails = asyncHandler(async (req, res) => {
  const targetId = req.params.id || req.user?._id;
  const updateData = { ...req.body };

  delete updateData.password;
  delete updateData.refreshToken;

  if (updateData.email) updateData.email = updateData.email.toLowerCase();

  const student = await StudentModel.findByIdAndUpdate(
    targetId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  if (!student) throw new ApiError(404, "Student not found");
  return res.status(200).json(new ApiResponse(200, student, "Student profile updated successfully ✅"));
});

// DELETE
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await StudentModel.findByIdAndDelete(req.params.id);
  if (!student) throw new ApiError(404, "Student not found");
  return res.status(200).json(new ApiResponse(200, {}, "Student deleted successfully ✅"));
});

// LOGOUT
const logoutStudent = asyncHandler(async (req, res) => {
  await StudentModel.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Student logged out successfully ✅"));
});

export {
  registerStudent,
  loginStudent,
  forgotPasswordStudent,
  getCurrentStudent,
  getStudentById,
  getAllStudents,
  updateStudentDetails,
  deleteStudent,
  logoutStudent,
};