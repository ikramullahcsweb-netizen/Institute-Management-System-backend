import mongoose from "mongoose";
import { AddClassesModel } from "../models/AddClasses.js";
import { AddAdditionalClassesModel } from "../models/AddAdditionalClasses.js";
import { RequestScheduleModel } from "../models/RequestSchedule.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ==========================================
// 1. CLASS MODULE METHODS (Standard Classes)
// ==========================================

// @desc    Route to add a new class
// @route   POST /api/v1/classes
const addclass = asyncHandler(async (req, res) => {
    const { teacher, classid, teacherid, subject, time, date, grade } = req.body;

    if (!teacher || !classid || !teacherid || !subject) {
        throw new ApiError(400, "Required fields are missing");
    }

    const newClass = await AddClassesModel.create({
        teacher,
        classid,
        teacherid,
        subject,
        time,
        date,
        grade
    });

    return res
        .status(201)
        .json(new ApiResponse(201, newClass, "Class created successfully"));
});

// @desc    Route to fetch all standard classes
// @route   GET /api/v1/classes
const getclass = asyncHandler(async (req, res) => {
    const classes = await AddClassesModel.find();
    return res
        .status(200)
        .json(new ApiResponse(200, classes, "Classes fetched successfully"));
});

// @desc    Fetch single standard class by ID
// @route   GET /api/v1/classes/:id
const updateclassid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Class ID format");

    const addClass = await AddClassesModel.findById(id);
    if (!addClass) throw new ApiError(404, "Class record not found");

    return res
        .status(200)
        .json(new ApiResponse(200, addClass, "Class fetched successfully"));
});

// @desc    Route to update a standard class
// @route   PUT /api/v1/classes/:id
const updateclass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Class ID format");

    const updatedClass = await AddClassesModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClass) throw new ApiError(404, "Class not found to update");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedClass, "Class updated successfully"));
});

// @desc    Route to delete a standard class
// @route   DELETE /api/v1/classes/:id
const deleteclass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Class ID format");

    const deleted = await AddClassesModel.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, "Class not found");

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Class deleted successfully"));
});

// ==========================================
// 2. ADDITIONAL CLASSES MODULE METHODS
// ==========================================

// @desc    Create addadditionalclass
// @route   POST /api/v1/additional-classes
const createaddadditionalclass = asyncHandler(async (req, res) => {
    const additionalClass = await AddAdditionalClassesModel.create(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, additionalClass, "Additional class created successfully"));
});

// @desc    Get all requested additional classes
// @route   GET /api/v1/additional-classes
const getallreqadiclass = asyncHandler(async (req, res) => {
    const additionalClasses = await AddAdditionalClassesModel.find();
    return res
        .status(200)
        .json(new ApiResponse(200, additionalClasses, "Additional classes fetched successfully"));
});

// @desc    Fetch single additional class by ID
// @route   GET /api/v1/additional-classes/:id
const getadditionalclass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const approveClass = await AddAdditionalClassesModel.findById(id);
    if (!approveClass) throw new ApiError(404, "Additional class not found");

    return res
        .status(200)
        .json(new ApiResponse(200, approveClass, "Additional class fetched successfully"));
});

// @desc    Route to update additional class
// @route   PUT /api/v1/additional-classes/:id
const updateadditionalclass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const updated = await AddAdditionalClassesModel.findByIdAndUpdate(id, req.body, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Additional class updated successfully"));
});

// @desc    Route to delete a requested additional class
// @route   DELETE /api/v1/additional-classes/:id
const deleteadditionalclass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    await AddAdditionalClassesModel.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Additional class deleted successfully"));
});

// ==========================================
// 3. REQUEST SCHEDULE MODULE METHODS
// ==========================================

// @desc    Create schedule request
// @route   POST /api/v1/schedules
const createshedule = asyncHandler(async (req, res) => {
    const schedule = await RequestScheduleModel.create(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, schedule, "Schedule created successfully"));
});

// @desc    Get all requested schedules
// @route   GET /api/v1/schedules
const getallreqsch = asyncHandler(async (req, res) => {
    const schedules = await RequestScheduleModel.find();
    return res
        .status(200)
        .json(new ApiResponse(200, schedules, "Schedules fetched successfully"));
});

// @desc    Fetch single request schedule by ID
// @route   GET /api/v1/schedules/:id
const getadditionalclassid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const approveClass = await RequestScheduleModel.findById(id);
    if (!approveClass) throw new ApiError(404, "Schedule request not found");

    return res
        .status(200)
        .json(new ApiResponse(200, approveClass, "Schedule request fetched successfully"));
});

// @desc    Route to update request schedule
// @route   PUT /api/v1/schedules/:id
const updateadditionalclassid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const updated = await RequestScheduleModel.findByIdAndUpdate(id, req.body, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Schedule request updated successfully"));
});

// @desc    Route to delete a requested schedule
// @route   DELETE /api/v1/schedules/:id
const deleteschedule = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    await RequestScheduleModel.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Schedule deleted successfully"));
});

// Clean and modular named exports mapping ES modules standard
export {
    addclass,
    getclass,
    updateclassid,
    updateclass,
    deleteclass,
    createaddadditionalclass,
    getallreqadiclass,
    getadditionalclass,
    updateadditionalclass,
    deleteadditionalclass,
    createshedule,
    getallreqsch,
    getadditionalclassid,
    updateadditionalclassid,
    deleteschedule,
    getallreqadiclass as getadditionalclassextra, // Aliased to support older routes cleanly
    getallreqsch as getschedule                  // Aliased to support older routes cleanly
};