import mongoose from "mongoose";
import { SubjectModel } from "../models/Subject.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createSubject = asyncHandler(async (req, res) => {
    const { subjectname } = req.body;
    if (!subjectname) throw new ApiError(400, "Subject name is required");

    const newSubject = await SubjectModel.create(req.body);
    if (!newSubject) throw new ApiError(500, "Something went wrong while creating the subject");

    return res.status(201).json(new ApiResponse(201, newSubject, "Subject created successfully"));
});

const getSubject = asyncHandler(async (req, res) => {
    const subjects = await SubjectModel.find();
    return res.status(200).json(new ApiResponse(200, subjects, "Subjects fetched successfully"));
});

const getSubjectid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new ApiError(400, "Subject ID is required");

    const subject = await SubjectModel.findOne({ sbid: id });
    if (!subject) throw new ApiError(404, "Subject not found");

    return res.status(200).json(new ApiResponse(200, subject, "Subject retrieved successfully"));
});

const getSubjectname = asyncHandler(async (req, res) => {
    const { name, grade } = req.params;
    if (!name || !grade) throw new ApiError(400, "Name and Grade are required");

    const matchedSubjects = await SubjectModel.find({ subjectname: name, grade });
    return res.status(200).json(new ApiResponse(200, matchedSubjects, "Subjects fetched successfully"));
});

export { createSubject, getSubject, getSubjectid, getSubjectname };