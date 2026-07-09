import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { TeacherModel } from "../models/Teacher.js";
import { StudentModel } from "../models/Student.js";

// Role ke hisab se sahi model select karta hai
const getModelByRole = (role) => {
  switch (role) {
    case "admin":
    case "manager":
      return User; // Admin aur Manager dono isi model mein hain
    case "teacher":
      return TeacherModel;
    case "student":
      return StudentModel;
    default:
      return null;
  }
};

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // SIRF Authorization header ka Bearer token use karo
    // Cookie bilkul use mat karo — role leakage hoti thi
    // httpOnly cookie JS se clear nahi hoti, isliye stale cookie problem thi
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request — Bearer token required");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const Model = getModelByRole(decodedToken?.role);
    if (!Model) {
      throw new ApiError(401, "Invalid token role");
    }

    const user = await Model.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = { ...user.toObject(), role: decodedToken.role };
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Forbidden: You do not have the required permissions (${roles.join(", ")})`
      );
    }
    next();
  };
};