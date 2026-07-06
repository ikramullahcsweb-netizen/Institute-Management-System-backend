


import mongoose from "mongoose";
import { ClassEnrollmentsModel } from "../models/ClassEnrollments.js"; // Verify path and extension
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Create a new class enrollment record
// @route   POST /api/v1/enrollments
const createClassEnrollment = asyncHandler(async (req, res) => {
    const { studentId, classId, teacherid, subject, time, grade } = req.body;

    // Field Validation Check
    if (!studentId || !classId || !teacherid || !subject) {
        throw new ApiError(400, "Required enrollment fields are missing");
    }

    const enrollment = await ClassEnrollmentsModel.create({
        studentId,
        classId,
        teacherid,
        subject,
        time,
        grade
    });

    if (!enrollment) {
        throw new ApiError(500, "Something went wrong while creating enrollment");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, enrollment, "Class enrollment created successfully"));
});

// @desc    Retrieve all class enrollment records
// @route   GET /api/v1/enrollments
const getAllClassEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await ClassEnrollmentsModel.find();

    return res
        .status(200)
        .json(new ApiResponse(200, enrollments, "Class enrollments retrieved successfully"));
});

// @desc    Retrieve a class enrollment record by its ID
// @route   GET /api/v1/enrollments/:id
const getClassEnrollmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid enrollment ID format");
    }

    const enrollment = await ClassEnrollmentsModel.findById(id);

    if (!enrollment) {
        throw new ApiError(404, "Class enrollment record not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, enrollment, "Class enrollment retrieved successfully"));
});

// @desc    Delete a class enrollment record by its ID
// @route   DELETE /api/v1/enrollments/:id
const deleteClassEnrollment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid enrollment ID format");
    }

    const deletedEnrollment = await ClassEnrollmentsModel.findByIdAndDelete(id);

    if (!deletedEnrollment) {
        throw new ApiError(404, "Class enrollment record not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Class enrollment deleted successfully"));
});

// @desc    Retrieve unique classIds across all enrollment records
// @route   GET /api/v1/enrollments/class-ids
const getAllClassIds = asyncHandler(async (req, res) => {
    // Optimization: Using mongoose 'distinct' is much faster than fetching everything and converting to a Set
    const uniqueClassIds = await ClassEnrollmentsModel.distinct("classId");

    return res
        .status(200)
        .json(new ApiResponse(200, uniqueClassIds, "Unique class IDs fetched successfully"));
});

// Clean ES Modules named exports
export {
    createClassEnrollment,
    getAllClassEnrollments,
    getClassEnrollmentById,
    deleteClassEnrollment,
    getAllClassIds
};