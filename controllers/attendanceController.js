// const AttendanceModel = require('../models/AttendanceModel')

// const createAttendance = async (req, res) => {
//     try {
//         const { studentId, classId, teacherId, subject } = req.body;

//         // Create a new attendance record
//         const attendance = new AttendanceModel({
//             studentId,
//             classId,
//             teacherId,
//             subject
//         });

//         // Save the attendance record to the database
//         await attendance.save();

//         res.status(201).json({ success: true, message: 'Attendance recorded successfully' });
//     } catch (error) {
//         console.error('Error creating attendance:', error);
//         res.status(500).json({ success: false, message: 'Failed to record attendance' });
//     }
// };

// const getAllAttendance = async (req, res) => {
//     try {
//         // Fetch all attendance records from the database
//         const attendance = await AttendanceModel.find().sort({time:-1});

//         res.status(200).json(attendance);
//     } catch (error) {
//         console.error('Error fetching attendance:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch attendance records' });
//     }
// };

// const getAttendanceById = async (req, res) => {
//     try {
//         const attendanceId = req.params.id;

//         // Find attendance by ID in the database
//         const attendance = await AttendanceModel.findById(attendanceId);

//         if (!attendance) {
//             return res.status(404).json({ success: false, message: 'Attendance not found' });
//         }

//         res.status(200).json(attendance);
//     } catch (error) {
//         console.error('Error fetching attendance by ID:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch attendance' });
//     }
// };

// const deleteAttendance = async (req, res) => {
//     try {
//         const attendanceId = req.params.id;

//         // Delete attendance by ID from the database
//         await AttendanceModel.findByIdAndDelete(attendanceId);

//         res.status(200).json({ success: true, message: 'Attendance deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting attendance:', error);
//         res.status(500).json({ success: false, message: 'Failed to delete attendance' });
//     }
// };

// module.exports = {
//     createAttendance,
//     getAllAttendance,
//     getAttendanceById,
//     deleteAttendance
// };



import mongoose from "mongoose";
import { AttendanceModel } from "../models/AttendanceModel.js"; // Verify path and .js extension
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Create a new attendance record
// @route   POST /api/v1/attendance
// @access  Protected
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