// const mongoose =require('mongoose');

// const TimetableSchema=new mongoose.Schema({
//    Date: { type: String, default: '' },
//    Start_time: { type: String, default: '' },
//    End_Time: { type: String, default: '' },
//    Grade: { type: String, default: '' },
//    Subject: { type: String, default: '' },
//    Teacher: { type: String, default: '' },
//    Hall: { type: String, default: '' },
//    Price: { type: Number,default: 0},
//    Manager_ID: { type: String, default: '' },
//    Added_Date: { type: String, default: '' }
// })
// const TimetableModel=mongoose.model('Timetabledata',TimetableSchema)

// module.exports=TimetableModel;


import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
    Date: { type: String, default: '' },
    Start_time: { type: String, default: '' },
    End_Time: { type: String, default: '' },
    Grade: { type: String, default: '' }, // String lagaya hai taaki number/string dono accept ho jayein
    Subject: { type: String, default: '' },
    Teacher: { type: String, default: '' },
    Hall: { type: String, default: '' },
    Price: { type: Number, default: 0 },
    Manager_ID: { type: String, default: '' },
    Added_Date: { type: String, default: '' }
});

export const TimetableModel = mongoose.model('Timetabledata', TimetableSchema);