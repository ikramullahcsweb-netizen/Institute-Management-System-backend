// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     name: {type: 'String', required: true},
//     email: {type: 'String', required: true},
//     contactnumber: {type: 'Number'},
//     grade: {type: 'Number', required: true},
//     username: {type: 'String', required: true},
//     stdid: {type: 'String', required: true, unique: true},
//     password: {type: 'String', required: true},
//     gender: {type: 'String', default: 'Male'},
//     parentname: {type: 'String', default: 'None'},
//     parentphonenumber: {type: 'Number', default: 0},
//     SecAnswer: {type: 'String', default: 'None'},

// },{timestamps: true})

// const StudentModel = mongoose.model('student_details', studentSchema);

// module.exports = StudentModel;



import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"]
    },
    email: {
        type: String, 
        required: [true, "Email is required"],
        unique: true
    },
    contactnumber: {
        type: String,
        default: ""
    },
    grade: {
        type: String, 
        required: [true, "Grade is required"]
    },
    stdid: {
        type: String, 
        required: [true, "Student ID is required"], 
        unique: true
    },
    password: {
        type: String, 
        required: [true, "Password is required"]
    },
    gender: {
        type: String, 
        default: "Male"
    },
    parentname: {
        type: String, 
        default: ""
    },
    parentphonenumber: {
        type: String, 
        default: ""
    },
    // SecAnswer: {
    //     type: String, 
    //     default: ""
    // }
}, { timestamps: true });

export const StudentModel = mongoose.model('student_details', studentSchema);