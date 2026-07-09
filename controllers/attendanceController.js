import mongoose from "mongoose";
import { AttendanceModel } from "../models/AttendanceModel.js"; // Verify path and .js extension
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAttendance = asyncHandler(async (req, res) => {
    const { studentId, classId, teacherId, subject } = req.body;

    // Validation check
    if (!studentId || !classId || !teacherId || !subject) {
        throw new ApiError(400, "All fields (studentId, classId, teacherId, subject) are required");
    }

    // Create and save the record using the modern approach
    const attendance = await AttendanceModel.create({
        studentId,
        classId,
        teacherId,
        subject
    });

    if (!attendance) {
        throw new ApiError(500, "Something went wrong while recording attendance");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, attendance, "Attendance recorded successfully"));
});

// @desc    Get all attendance records
// @route   GET /api/v1/attendance
// @access  Protected
const getAllAttendance = asyncHandler(async (req, res) => {
    const attendance = await AttendanceModel.find().sort({ time: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, attendance, "Attendance records fetched successfully"));
});

// @desc    Get attendance record by ID
// @route   GET /api/v1/attendance/:id
// @access  Protected
const getAttendanceById = asyncHandler(async (req, res) => {
    const attendanceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
        throw new ApiError(400, "Invalid attendance record ID format");
    }

    const attendance = await AttendanceModel.findById(attendanceId);

    if (!attendance) {
        throw new ApiError(404, "Attendance record not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, attendance, "Attendance record retrieved successfully"));
});

// @desc    Delete attendance record by ID
// @route   DELETE /api/v1/attendance/:id
// @access  Protected
const deleteAttendance = asyncHandler(async (req, res) => {
    const attendanceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
        throw new ApiError(400, "Invalid attendance record ID format");
    }

    const deletedAttendance = await AttendanceModel.findByIdAndDelete(attendanceId);

    if (!deletedAttendance) {
        throw new ApiError(404, "Attendance record not found or already deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Attendance deleted successfully"));
});

// Export clean wrapper setup
export {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    deleteAttendance
};