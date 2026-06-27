// const mongoose = require('mongoose');

// const subject = new mongoose.Schema({
//     sbid: {type: 'String'},
//     subjectname: {type: 'String'},
//     grade: {type: 'Number'},
//     teid: {type: 'String'},
//     teachername: {type: 'String'},
//     amount: {type: 'String'}


// });

// const Subject = mongoose.model('subject', subject);

// module.exports = Subject;



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