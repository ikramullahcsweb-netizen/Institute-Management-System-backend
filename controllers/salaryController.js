// const SalaryModel = require('../models/Salary');


// const getusers = (req, res) => {
//     SalaryModel.find()
//         .then(users => res.json(users))
//         .catch(err => {
//             console.error("Error fetching users:", err);
//             res.status(500).json({ error: "An error occurred while fetching users." });
//         });
// }

// // Get user by ID
// const getusersid = (req, res) => {
//     const id = req.params.id;
//     SalaryModel.findById(id)
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json({ error: "User not found." });
//             }
//             res.json(user);
//         })
//         .catch(err => {
//             console.error("Error fetching user:", err);
//             res.status(500).json({ error: "An error occurred while fetching user." });
//         });
// }

// // Update user
// const updateuser = (req, res) => {
//     const id = req.params.id;
//     SalaryModel.findByIdAndUpdate(id, req.body, { new: true })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json({ error: "User not found." });
//             }
//             res.json(user);
//         })
//         .catch(err => {
//             console.error("Error updating user:", err);
//             res.status(500).json({ error: "An error occurred while updating user." });
//         });
// }

// // Delete user
// const deleteuser = (req, res) => {
//     const id = req.params.id;
//     SalaryModel.findByIdAndDelete(id)
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json({ error: "User not found." });
//             }
//             res.json(user);
//         })
//         .catch(err => {
//             console.error("Error deleting user:", err);
//             res.status(500).json({ error: "An error occurred while deleting user." });
//         });
// }

// module.exports = {   
//    /*  createuser, */
//     getusers,
//     getusersid,
//     updateuser,
//     deleteuser
// }


import mongoose from "mongoose";
import { SalaryModel } from "../models/Salary.js"; // Variable structure consistent rakha aur .js extension add ki
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Get all salaries / users
// @route   GET /api/v1/salaries
const getusers = asyncHandler(async (req, res) => {
    const salaries = await SalaryModel.find();
    
    return res
        .status(200)
        .json(new ApiResponse(200, salaries, "Salaries record fetched successfully"));
});

// @desc    Get salary / user by ID
// @route   GET /api/v1/salaries/:id
const getusersid = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // ID verification guard
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Salary Record ID format");
    }

    const salaryRecord = await SalaryModel.findById(id);

    if (!salaryRecord) {
        throw new ApiError(404, "Salary record not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, salaryRecord, "Salary record retrieved successfully"));
});

// @desc    Update salary / user record
// @route   PUT /api/v1/salaries/:id
const updateuser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Salary Record ID format");
    }

    // { new: true, runValidators: true } lagane se database schema rules maintain rehte hain
    const updatedSalary = await SalaryModel.findByIdAndUpdate(
        id, 
        { $set: req.body }, 
        { new: true, runValidators: true }
    );

    if (!updatedSalary) {
        throw new ApiError(404, "Salary record not found to update");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedSalary, "Salary record updated successfully"));
});

// @desc    Delete salary / user record
// @route   DELETE /api/v1/salaries/:id
const deleteuser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Salary Record ID format");
    }

    const deletedSalary = await SalaryModel.findByIdAndDelete(id);

    if (!deletedSalary) {
        throw new ApiError(404, "Salary record not found or already deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedSalary, "Salary record deleted successfully"));
});

// ES Modules Named Exports structure 
export {
    getusers,
    getusersid,
    updateuser,
    deleteuser
};