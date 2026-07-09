

import mongoose from "mongoose";

const TFSchema = new mongoose.Schema({
    grade: { type: String, default: "" },
    subject: { type: String, default: "" },
    teacher: { type: String, default: "" },
    sid: { type: String, default: "" },
    feedback: { type: String, default: "" }
});

export const tfeedbackModel = mongoose.model('teacherfeedbacks', TFSchema);