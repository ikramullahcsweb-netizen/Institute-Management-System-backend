// const mongoose = require('mongoose');

// const TFSchema = new mongoose.Schema({
//     grade:'String',
//     subject:'String',
//     teacher:'String',
//     sid:'String',
//     feedback:'String',
// });
// const tfeedbackModel = mongoose.model('teacherfeedbacks', TFSchema);

// module.exports = tfeedbackModel;




import mongoose from "mongoose";

const TFSchema = new mongoose.Schema({
    grade: { type: String, default: "" },
    subject: { type: String, default: "" },
    teacher: { type: String, default: "" },
    sid: { type: String, default: "" },
    feedback: { type: String, default: "" }
});

export const tfeedbackModel = mongoose.model('teacherfeedbacks', TFSchema);