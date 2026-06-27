// const StudentModel = require('../models/Students.js');

// // Controller function to create a new student
// exports.createStudent = async (req, res) => {
//     try {
//         const student = new StudentModel(req.body);
//         await student.save();
//         res.status(201).json(student);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Controller function to get all students
// exports.getAllStudents = async (req, res) => {
//     try {
//         const students = await StudentModel.find();
//         res.status(200).json(students);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Controller function to get a single student by ID
// exports.getStudentById = async (req, res) => {
//     try {
//         const student = await StudentModel.findById(req.params.id);
//         if (!student) {
//             return res.status(404).json({ message: 'Student not found' });
//         }
//         res.status(200).json(student);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Controller function to update a student by ID
// exports.updateStudentById = async (req, res) => {
//     try {
//         const student = await StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!student) {
//             return res.status(404).json({ message: 'Student not found' });
//         }
//         res.status(200).json(student);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Controller function to delete a student by ID
// exports.deleteStudentById = async (req, res) => {
//     try {
//         const student = await StudentModel.findByIdAndDelete(req.params.id);
//         if (!student) {
//             return res.status(404).json({ message: 'Student not found' });
//         }
//         res.status(204).send(); // No content
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };





import mongoose from "mongoose";
import { StudentModel } from "../models/Students.js"; // Verify precise path structure
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Controller function to create a new student
// @route   POST /api/v1/students
const createStudent = asyncHandler(async (req, res) => {
    // Basic field sanity check (Schema rules update kar sakte hain)
    if (!req.body) {
        throw new ApiError(400, "Student registration content parameters missing");
    }

    const student = await StudentModel.create(req.body);

    if (!student) {
        throw new ApiError(500, "Something went wrong while enrolling the student");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, student, "Student enrolled successfully"));
});

// @desc    Controller function to get all students
// @route   GET /api/v1/students
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await StudentModel.find();

    return res
        .status(200)
        .json(new ApiResponse(200, students, "All students data registry fetched"));
});

// @desc    Controller function to get a single student by ID
// @route   GET /api/v1/students/:id
const getStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Student Record ID format");
    }

    const student = await StudentModel.findById(id);

    if (!student) {
        throw new ApiError(404, "Student dashboard record not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student record matching ID verified"));
});

// @desc    Controller function to update a student by ID
// @route   PUT /api/v1/students/:id
const updateStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Student Record ID format");
    }

    const student = await StudentModel.findByIdAndUpdate(
        id, 
        { $set: req.body }, 
        { new: true, runValidators: true }
    );

    if (!student) {
        throw new ApiError(404, "Student target row not found to update");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student account attributes optimized"));
});

// @desc    Controller function to delete a student by ID
// @route   DELETE /api/v1/students/:id
const deleteStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Student Record ID format");
    }

    const student = await StudentModel.findByIdAndDelete(id);

    if (!student) {
        throw new ApiError(404, "Student record target already missing");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Student removed from registry database logs"));
});

// Export configuration matching clean architecture 
export {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
};