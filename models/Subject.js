


import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    sbid: { type: String, default: "" },
    subjectname: { type: String, default: "" },
    grade: { type: String, default: "" },
    teid: { type: String, default: "" },
    teachername: { type: String, default: "" },
    amount: { type: String, default: "" }
});

export const SubjectModel = mongoose.model('subject', subjectSchema);