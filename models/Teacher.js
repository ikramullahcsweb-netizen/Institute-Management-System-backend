// const mongoose = require('mongoose');

// const teacherSchema = new mongoose.Schema({
//     name: {type: 'String', required: true},
//     email: {type: 'String', required: true},
//     contactnumber: {type: 'Number', required: true},
//     username: {type: 'String', required: true},
//     teid: {type: 'String', required: true, unique: true},
//     password: {type: 'String', required: true},
//     gender: {type: 'String', required: true},    
//     subject: {type: 'String', required: true},
//     SecAnswer: {type: 'String', required: true},

// },{timestamps: true})

// const TeacherModel = mongoose.model('teacher_details', teacherSchema);

// module.exports = TeacherModel;





import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
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
        required: [true, "Contact number is required"]
    },
    teid: {
        type: String, 
        required: [true, "Teacher ID is required"], 
        unique: true
    },
    password: {
        type: String, 
        required: [true, "Password is required"]
    },
    gender: {
        type: String, 
        required: [true, "Gender is required"]
    },    
    subject: {
        type: String, 
        required: [true, "Subject is required"]
    },
    // SecAnswer: {
    //     type: String, 
    //     required: [true, "Security answer is required"]
    // }
}, { timestamps: true });

export const TeacherModel = mongoose.model('teacher_details', teacherSchema);