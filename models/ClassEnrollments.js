// const mongoose = require('mongoose');

// const ClassEnrollmentsSchema = new mongoose.Schema({
//     studentId: {
//         type: String,
//         required: true
//     },
//     classId: {
//         type: String,
//         required: true
//     },
//     teacherid:{
//         type:String,
//         required:true

//     },
//     subject:{
//         type:String,
//         required:true
//     },
//     time:{
//         type:String,
//         required:true
//     },
//     grade:{ 
//         type:Number,
//         required:true

//     },   

//     date: {
//         type: Date,
//         default: Date.now
//     }
// });


// ClassEnrollmentsSchema.index({ studentId: 1, classId: 1 }, { unique: true });

// const ClassEnrollmentsModel = mongoose.model('ClassEnrollment', ClassEnrollmentsSchema);

// module.exports = ClassEnrollmentsModel;




import mongoose from "mongoose";

const ClassEnrollmentsSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: [true, "Student ID is required"]
    },
    classId: {
        type: String,
        required: [true, "Class ID is required"]
    },
    teacherid: {
        type: String,
        required: [true, "Teacher ID is required"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"]
    },
    time: {
        type: String,
        required: [true, "Time is required"]
    },
    grade: { 
        type: String,
        required: [true, "Grade is required"]
    },   
    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0]
    }
});

ClassEnrollmentsSchema.index({ studentId: 1, classId: 1 }, { unique: true });

export const ClassEnrollmentsModel = mongoose.model('ClassEnrollment', ClassEnrollmentsSchema);