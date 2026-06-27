// const NoticeModel = require('../models/InstituteNotice');

// const InstituteNotices = (req, res) => {
//     NoticeModel.find()
//     .then(MyClasses => res.json(MyClasses))
//     .catch(err => res.json(err));
// }

// const createInstituteNotices = (req, res) => {
//     NoticeModel.create(req.body)
//     .then((data) => {
//         res.json(data);
//     })
//     .catch((err) => {
//         res.json(err);
//     });
// }

// const deleteInstituteNotices = (req, res) => {
//     const id = req.params.id;
//     NoticeModel.findByIdAndDelete({_id:id})
//     .then(MyClasses => res.json(MyClasses))
//     .catch(err => res.json(err));
// }

// module.exports = {
//     InstituteNotices,
//     createInstituteNotices,
//     deleteInstituteNotices
// }



import mongoose from "mongoose";
import { InstituteNoticeModel } from "../models/InstituteNotice.js"; // Path aur .js extension check karlein
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Get all institute notices
// @route   GET /api/v1/notices
const InstituteNotices = asyncHandler(async (req, res) => {
    const notices = await NoticeModel.find();
    
    return res
        .status(200)
        .json(new ApiResponse(200, notices, "Institute notices fetched successfully"));
});

// @desc    Create a new institute notice
// @route   POST /api/v1/notices
const createInstituteNotices = asyncHandler(async (req, res) => {
    const { title, content } = req.body; // Apne Schema ke mutabik mandatory fields destruct kar sakte hain

    const notice = await NoticeModel.create(req.body);

    if (!notice) {
        throw new ApiError(500, "Something went wrong while creating the notice");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, notice, "Notice created successfully"));
});

// @desc    Delete an institute notice by ID
// @route   DELETE /api/v1/notices/:id
const deleteInstituteNotices = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // ID Format Validation Check
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid notice ID format");
    }

    const deletedNotice = await NoticeModel.findByIdAndDelete(id);

    if (!deletedNotice) {
        throw new ApiError(404, "Notice record not found or already deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Notice deleted successfully"));
});

// Named exports configuration
export {
    InstituteNotices,
    createInstituteNotices,
    deleteInstituteNotices
};