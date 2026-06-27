
// const UserModel = require('../models/Notice');


// //create a Notice
// const createnotice = (req, res) => {
//     UserModel.create(req.body)
//     .then((data) => {
//         res.json(data);
//     })
//     .catch((err) => {
//         res.json(err);
//     });
// }

// //get all Notices
// const viewnotice = (req, res) => {
//     UserModel.find()
//     .then(MyClasses => res.json(MyClasses))
//     .catch(err => res.json(err));
// }

// //Get Notice by id
// const getnotice = (req, res) => {
//     const id = req.params.id;
//     UserModel.findById({_id:id})
//     .then(MyClasses => res.json(MyClasses))
//     .catch(err => res.json(err));
// }

// //update Notice
// const updatenotice = (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({_id:id}, {
//         topic: req.body.topic,
//         date: req.body.date,
//         description: req.body.description
//     })
//     .then(MyClasses => res.json(MyClasses))
//     .catch(err => res.json(err));
// }

// //delete Notice
// const deletenotice = (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({_id:id})
//     .then(MyClasses => res.json(MyClasses))
//     .catch(err => res.json(err));
// }




// module.exports = {
//     createnotice,
//     viewnotice,
//     getnotice,
//     updatenotice,
//     deletenotice
    
// }






import mongoose from "mongoose";
import { NoticeModel } from "../models/Notice.js"; // Variable standard kiya aur .js extension add ki
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Create a new Notice
// @route   POST /api/v1/teacher-notices
const createnotice = asyncHandler(async (req, res) => {
    const { topic, date, description } = req.body;

    // Field Validation Check
    if (!topic || !description) {
        throw new ApiError(400, "Topic and Description fields are required");
    }

    const notice = await NoticeModel.create({
        topic,
        date,
        description
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