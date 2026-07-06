
import mongoose from "mongoose";
import { SubjectModel } from "../models/Subject.js"; // Standard .js extension added
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Create a new Subject
// @route   POST /api/v1/subjects
const createSubject = asyncHandler(async (req, res) => {
    const { subjectname, grade } = req.body;

    // Field Validation Check
    if (!subjectname) {
        throw new ApiError(400, "Subject name is required");
    }

    const newSubject = await Subject.create(req.body);

    if (!newSubject) {
        throw new ApiError(500, "Something went wrong while creating the subject");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, newSubject, "Subject created successfully"));
});

// @desc    Get all Subjects
// @route   GET /api/v1/subjects
const getSubject = asyncHandler(async (req, res) => {
    const subjects = await Subject.find();

    return res
        .status(200)
        .json(new ApiResponse(200, subjects, "Subjects fetched successfully"));
});

// @desc    Get single Subject by custom sbid
// @route   GET /api/v1/subjects/sb/:id
const getSubjectid = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Subject custom ID (sbid) is required");
    }

    // Custom unique key field query implementation
    const subject = await Subject.findOne({ sbid: id });

    if (!subject) {
        throw new ApiError(404, "Subject with matching custom ID not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, subject, "Subject retrieved successfully using custom ID"));
});

// @desc    Get Subject by matching name and grade parameters
// @route   GET /api/v1/subjects/filter/:name/:grade
const getSubjectname = asyncHandler(async (req, res) => {
    const { name, grade } = req.params;

    if (!name || !grade) {
        throw new ApiError(400, "Both Name and Grade parameters are required for tracking");
    }

    // Compound queries checking equality matches inside collections
    const matchedSubjects = await Subject.find({ 
        subjectname: name, 
        grade: grade 
    });

    return res
        .status(200)
        .json(new ApiResponse(200, matchedSubjects, "Filtered subjects data compiled successfully"));
});

// ES Modules Named Exports Structure
export {
    createSubject,
    getSubject,
    getSubjectid,
    getSubjectname
};