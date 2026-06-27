// const TimetableModel = require('../models/AddnewClasstime');

// const test = (req, res) => {
//     res.json('test is working')
// }

// const Studenttimetable = (req, res) => {
//     TimetableModel.find()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// }


// const AlltimetableData = (req, res) => {
//     TimetableModel.find()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// }

// const getOneTimetableData = (req, res) => {
//     const id =req.params.id;
//     TimetableModel.findById({_id:id})
//     .then(timetabledata=>res.json(timetabledata))
//     .catch(err=>res.json(err));

// }

// const deleteTimetableData = (req, res) => {
//     const { id } = req.params;
//     TimetableModel.findByIdAndDelete({_id:id})
    
//     .then(timetabledata => {
//         if (!timetabledata) {
//             return res.status(404).json({ error: 'Timetable data not found' });
//         }
//         res.json({ message: 'Timetable data deleted successfully', timetabledata });
//     })
//     .catch(err => 
//         res.status(500).json({ error: 'Failed to delete timetable data', err })
//     );

// }
// const AddnewClasstime = (req, res) => {
//     TimetableModel.create(req.body)
//     .then((data)=>{
//         res.status(201).json({ message: 'Timetable data added successfully', data });
//     })


//     .catch((err)=>{
//     res.json(err);

//     })}

//  const UpdateTimetable = (req, res) => {
//     const id = req.params.id; // Corrected to directly use req.params.id
//     const { date, Class_ID, startTime, endTime, grade, subject, teacher, hall, price, managerId, addedDate } = req.body;

    
   
//     TimetableModel.findByIdAndUpdate(id,req.body) // To return the updated document
//         .then(timetabledata => res.json(timetabledata))
//         .catch(err => {
//             console.error('Error updating document:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// };
 

// module.exports = {
//     test,
//     Studenttimetable,
//     AddnewClasstime,
//     AlltimetableData,
//     UpdateTimetable,
//     getOneTimetableData,
//     deleteTimetableData 
    
// }



import mongoose from "mongoose";
import { TimetableModel } from "../models/AddnewClasstime.js"; // Verify path structure and standard extension
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Test endpoint verification row
// @route   GET /api/v1/timetable/test
const test = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, "test is working", "Health check passed"));
});

// @desc    Retrieve timetable data tailored for student portals
// @route   GET /api/v1/timetable/student
const Studenttimetable = asyncHandler(async (req, res) => {
    const data = await TimetableModel.find();
    
    return res
        .status(200)
        .json(new ApiResponse(200, data, "Student timetable view data fetched"));
});

// @desc    Retrieve all core aggregate operational slots
// @route   GET /api/v1/timetable
const AlltimetableData = asyncHandler(async (req, res) => {
    const data = await TimetableModel.find();
    
    return res
        .status(200)
        .json(new ApiResponse(200, data, "All timetable registries compiled"));
});

// @desc    Isolate single operational scheduling block by ID
// @route   GET /api/v1/timetable/:id
const getOneTimetableData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid schedule profile ID format");
    }

    const timetableData = await TimetableModel.findById(id);

    if (!timetableData) {
        throw new ApiError(404, "Target timetable registry not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, timetableData, "Schedule entry details fetched"));
});

// @desc    Commit new slot transaction data parameters
// @route   POST /api/v1/timetable
const AddnewClasstime = asyncHandler(async (req, res) => {
    const { startTime, endTime, grade, subject, teacher } = req.body;

    // Direct sanity validations filter
    if (!startTime || !endTime || !subject || !teacher) {
        throw new ApiError(400, "Required transactional allocation fields missing");
    }

    const newSlot = await TimetableModel.create(req.body);

    if (!newSlot) {
        throw new ApiError(500, "Something went wrong while logging timetable item");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, newSlot, "Timetable row data added successfully"));
});

// @desc    Modify parameter structures on existing schedule records
// @route   PUT /api/v1/timetable/:id
const UpdateTimetable = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid schedule profile ID format");
    }

    // Modern tracking requires passing { new: true } to intercept updated values instead of stale reads
    const updatedTimetable = await TimetableModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    if (!updatedTimetable) {
        throw new ApiError(404, "Timetable targets not matching registry rows");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTimetable, "Timetable parameters modified successfully"));
});

// @desc    Purge target slot logs out of scheduling systems
// @route   DELETE /api/v1/timetable/:id
const deleteTimetableData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid schedule profile ID format");
    }

    const deletedData = await TimetableModel.findByIdAndDelete(id);

    if (!deletedData) {
        throw new ApiError(404, "Timetable entry block already missing");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedData, "Timetable structural data dropped safely"));
});

// Export configuration matching core architectural standards
export {
    test,
    Studenttimetable,
    AddnewClasstime,
    AlltimetableData,
    UpdateTimetable,
    getOneTimetableData,
    deleteTimetableData
};