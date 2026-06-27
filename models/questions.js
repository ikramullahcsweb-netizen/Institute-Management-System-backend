// const mongoose = require('mongoose');

// const QSchema = new mongoose.Schema({

//     grade:'String',
//     subject:'String',
//     teacher:'String',
//     sid:'String',
//     question:'String',
//     answer:'String',

// });

// const questionModel = mongoose.model('questions', QSchema);

// module.exports = questionModel;



import mongoose from "mongoose";

const QSchema = new mongoose.Schema({
    grade: { type: String, default: "" },
    subject: { type: String, default: "" },
    teacher: { type: String, default: "" },
    sid: { type: String, default: "" },
    question: { type: String, default: "" },
    answer: { type: String, default: "" }
});

export const questionModel = mongoose.model('questions', QSchema);