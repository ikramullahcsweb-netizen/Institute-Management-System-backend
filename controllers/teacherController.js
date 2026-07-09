// import { TeacherModel } from "../models/Teacher.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const cookieOptions = { httpOnly: true, secure: true };

// const generateTokens = async (teacherId) => {
//   try {
//     const teacher = await TeacherModel.findById(teacherId);
//     const accessToken = teacher.generateAccessToken();
//     const refreshToken = teacher.generateRefreshToken();
//     teacher.refreshToken = refreshToken;
//     await teacher.save({ validateBeforeSave: false });
//     return { accessToken, refreshToken };
//   } catch {
//     throw new ApiError(500, "Something went wrong while generating tokens");
//   }
// };

// const registerTeacher = asyncHandler(async (req, res) => {
//   const { name, email, contactnumber, teid, gender, subject, password, SecAnswer } = req.body;

//   if (!name?.trim() || !email?.trim() || !password?.trim()) {
//     throw new ApiError(400, "Name, email, and password are required");
//   }
//   if (!contactnumber?.toString().trim() || !teid?.trim() || !gender?.trim() || !subject?.trim()) {
//     throw new ApiError(400, "Contact number, Teacher ID, gender, and subject are required");
//   }

//   const existedTeacher = await TeacherModel.findOne({
//     $or: [{ email: email.toLowerCase() }, { teid }],
//   });
//   if (existedTeacher) {
//     throw new ApiError(409, "Teacher with this email or Teacher ID already exists");
//   }

//   const teacher = await TeacherModel.create({
//     name,
//     email: email.toLowerCase(),
//     contactnumber,
//     teid,
//     gender,
//     subject,
//     password,
//     SecAnswer,
//   });

//   const createdTeacher = await TeacherModel.findById(teacher._id).select("-password -refreshToken");
//   if (!createdTeacher) throw new ApiError(500, "Something went wrong while registering the teacher");

//   return res.status(201).json(new ApiResponse(201, createdTeacher, "Teacher registered successfully ✅"));
// });

// const loginTeacher = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) throw new ApiError(400, "Email and password are required");

//   const teacher = await TeacherModel.findOne({ email: email.toLowerCase() });
//   if (!teacher) throw new ApiError(404, "Teacher does not exist");

//   const isPasswordValid = await teacher.isPasswordCorrect(password);
//   if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

//   const { accessToken, refreshToken } = await generateTokens(teacher._id);
//   const loggedInTeacher = await TeacherModel.findById(teacher._id).select("-password -refreshToken");

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, cookieOptions)
//     .cookie("refreshToken", refreshToken, cookieOptions)
//     .json(new ApiResponse(200, { teacher: loggedInTeacher, accessToken }, "Teacher logged in successfully ✅"));
// });

// const forgotPasswordTeacher = asyncHandler(async (req, res) => {
//   const { email, SecAnswer, newPassword } = req.body;
//   if (!email || !SecAnswer || !newPassword) {
//     throw new ApiError(400, "Email, Security Answer, and New Password are required");
//   }

//   const teacher = await TeacherModel.findOne({ email: email.toLowerCase(), SecAnswer });
//   if (!teacher) throw new ApiError(400, "Wrong email or security answer");

//   teacher.password = newPassword;
//   await teacher.save({ validateBeforeSave: false });

//   return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully ✅"));
// });

// const getCurrentTeacher = asyncHandler(async (req, res) => {
//   return res.status(200).json(new ApiResponse(200, req.user, "Current teacher fetched successfully ✅"));
// });

// const getTeacherById = asyncHandler(async (req, res) => {
//   const teacher = await TeacherModel.findById(req.params.id).select("-password -refreshToken");
//   if (!teacher) throw new ApiError(404, "Teacher not found");
//   return res.status(200).json(new ApiResponse(200, teacher, "Teacher fetched successfully ✅"));
// });

// const updateTeacherDetails = asyncHandler(async (req, res) => {
//   const { name, email, contactnumber, gender, subject, SecAnswer } = req.body;

//   if (!name || !email) throw new ApiError(400, "Name and email are required");

//   const targetId = req.params.id || req.user?._id;

//   const teacher = await TeacherModel.findByIdAndUpdate(
//     targetId,
//     { $set: { name, email: email.toLowerCase(), contactnumber, gender, subject, SecAnswer } },
//     { new: true }
//   ).select("-password -refreshToken");

//   if (!teacher) throw new ApiError(404, "Teacher not found");
//   return res.status(200).json(new ApiResponse(200, teacher, "Teacher profile updated successfully ✅"));
// });

// const getAllTeachers = asyncHandler(async (req, res) => {
//   const teachers = await TeacherModel.find().select("-password -refreshToken");
//   return res.status(200).json(new ApiResponse(200, teachers, "All teachers fetched successfully ✅"));
// });

// const deleteTeacher = asyncHandler(async (req, res) => {
//   const teacher = await TeacherModel.findByIdAndDelete(req.params.id);
//   if (!teacher) throw new ApiError(404, "Teacher not found");
//   return res.status(200).json(new ApiResponse(200, {}, "Teacher deleted successfully ✅"));
// });

// const logoutTeacher = asyncHandler(async (req, res) => {
//   await TeacherModel.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

//   return res
//     .status(200)
//     .clearCookie("accessToken", cookieOptions)
//     .clearCookie("refreshToken", cookieOptions)
//     .json(new ApiResponse(200, {}, "Teacher logged out successfully ✅"));
// });

// export {
//   registerTeacher,
//   loginTeacher,
//   forgotPasswordTeacher,
//   getCurrentTeacher,
//   getTeacherById,
//   updateTeacherDetails,
//   getAllTeachers,
//   deleteTeacher,
//   logoutTeacher,
// };



import { TeacherModel } from "../models/Teacher.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const cookieOptions = { httpOnly: true, secure: false, sameSite: "lax" };

const generateTokens = async (teacherId) => {
  try {
    const teacher = await TeacherModel.findById(teacherId);
    const accessToken = teacher.generateAccessToken();
    const refreshToken = teacher.generateRefreshToken();
    teacher.refreshToken = refreshToken;
    await teacher.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerTeacher = asyncHandler(async (req, res) => {
  const { name, email, contactnumber, teid, gender, subject, password, SecAnswer } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    throw new ApiError(400, "Name, email, and password are required");
  }
  if (!contactnumber?.toString().trim() || !teid?.trim() || !gender?.trim() || !subject?.trim()) {
    throw new ApiError(400, "Contact number, Teacher ID, gender, and subject are required");
  }

  const existedTeacher = await TeacherModel.findOne({
    $or: [{ email: email.toLowerCase() }, { teid }],
  });
  if (existedTeacher) {
    throw new ApiError(409, "Teacher with this email or Teacher ID already exists");
  }

  const teacher = await TeacherModel.create({
    name,
    email: email.toLowerCase(),
    contactnumber,
    teid,
    gender,
    subject,
    password,
    SecAnswer,
  });

  const createdTeacher = await TeacherModel.findById(teacher._id).select("-password -refreshToken");
  if (!createdTeacher) throw new ApiError(500, "Something went wrong while registering the teacher");

  return res.status(201).json(new ApiResponse(201, createdTeacher, "Teacher registered successfully ✅"));
});

const loginTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password are required");

  const teacher = await TeacherModel.findOne({ email: email.toLowerCase() });
  if (!teacher) throw new ApiError(404, "Teacher does not exist");

  const isPasswordValid = await teacher.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateTokens(teacher._id);
  const loggedInTeacher = await TeacherModel.findById(teacher._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { teacher: loggedInTeacher, accessToken }, "Teacher logged in successfully ✅"));
});

const forgotPasswordTeacher = asyncHandler(async (req, res) => {
  const { email, SecAnswer, newPassword } = req.body;
  if (!email || !SecAnswer || !newPassword) {
    throw new ApiError(400, "Email, Security Answer, and New Password are required");
  }

  const teacher = await TeacherModel.findOne({ email: email.toLowerCase(), SecAnswer });
  if (!teacher) throw new ApiError(400, "Wrong email or security answer");

  teacher.password = newPassword;
  await teacher.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully ✅"));
});

const getCurrentTeacher = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current teacher fetched successfully ✅"));
});

const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await TeacherModel.findById(req.params.id).select("-password -refreshToken");
  if (!teacher) throw new ApiError(404, "Teacher not found");
  return res.status(200).json(new ApiResponse(200, teacher, "Teacher fetched successfully ✅"));
});

const updateTeacherDetails = asyncHandler(async (req, res) => {
  const { name, email, contactnumber, gender, subject, SecAnswer } = req.body;

  if (!name || !email) throw new ApiError(400, "Name and email are required");

  const targetId = req.params.id || req.user?._id;

  const teacher = await TeacherModel.findByIdAndUpdate(
    targetId,
    { $set: { name, email: email.toLowerCase(), contactnumber, gender, subject, SecAnswer } },
    { new: true }
  ).select("-password -refreshToken");

  if (!teacher) throw new ApiError(404, "Teacher not found");
  return res.status(200).json(new ApiResponse(200, teacher, "Teacher profile updated successfully ✅"));
});

const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await TeacherModel.find().select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, teachers, "All teachers fetched successfully ✅"));
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await TeacherModel.findByIdAndDelete(req.params.id);
  if (!teacher) throw new ApiError(404, "Teacher not found");
  return res.status(200).json(new ApiResponse(200, {}, "Teacher deleted successfully ✅"));
});

const logoutTeacher = asyncHandler(async (req, res) => {
  await TeacherModel.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Teacher logged out successfully ✅"));
});

export {
  registerTeacher,
  loginTeacher,
  forgotPasswordTeacher,
  getCurrentTeacher,
  getTeacherById,
  updateTeacherDetails,
  getAllTeachers,
  deleteTeacher,
  logoutTeacher,
};