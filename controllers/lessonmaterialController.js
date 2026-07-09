
import mongoose from "mongoose";
import { NoticeModel } from "../models/Notice.js"; // Variable standard kiya aur .js extension add ki
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Create a new Notice
// @route   POST /api/v1/teacher-notices
const createnotice = asyncHandler(async (req, res) => {
    const { topic, date, description, subject_name, grade, teacher_id } = req.body;

    if (!topic || !description) {
        throw new ApiError(400, "Topic and Description fields are required");
    }

    const notice = await NoticeModel.create({
        topic,
        date,
        description,
        subject_name,
        grade,
        teacher_id
    });

    if (!notice) {
        throw new ApiError(500, "Something went wrong while creating the notice");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, notice, "Notice created successfully"));
});

// @desc    Get all Notices
// @route   GET /api/v1/teacher-notices
const viewnotice = asyncHandler(async (req, res) => {
    const notices = await NoticeModel.find();

    return res
        .status(200)
        .json(new ApiResponse(200, notices, "Notices fetched successfully"));
});

// @desc    Get Notice by ID
// @route   GET /api/v1/teacher-notices/:id
const getnotice = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Notice ID format");
    }

    const notice = await NoticeModel.findById(id);

    if (!notice) {
        throw new ApiError(404, "Notice not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, notice, "Notice retrieved successfully"));
});

// @desc    Update Notice by ID
// @route   PUT /api/v1/teacher-notices/:id
const updatenotice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { topic, date, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Notice ID format");
    }

    // { new: true } lagane se mongoose updated data return karega, purana nahi
    const updatedNotice = await NoticeModel.findByIdAndUpdate(
        id,
        {
            $set: {
                topic,
                date,
                description
            }
        },
        { new: true }
    );

    if (!updatedNotice) {
        throw new ApiError(404, "Notice not found to update");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedNotice, "Notice updated successfully"));
});

// @desc    Delete Notice by ID
// @route   DELETE /api/v1/teacher-notices/:id
const deletenotice = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Notice ID format");
    }

    const deletedNotice = await NoticeModel.findByIdAndDelete(id);

    if (!deletedNotice) {
        throw new ApiError(404, "Notice not found or already deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Notice deleted successfully"));
});

// ES Modules Named Exports
export {
    createnotice,
    viewnotice,
    getnotice,
    updatenotice,
    deletenotice
};