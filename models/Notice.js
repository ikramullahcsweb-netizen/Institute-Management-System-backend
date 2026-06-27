// const mongoose = require('mongoose');

// const NoticeSchema = new mongoose.Schema({

//     topic: 'String',
//     date: 'String',
//     description: 'String',
//     subject_name: 'String',
//     grade: 'Number',
//     teacher_id: 'String'
// });

// const UserModel = mongoose.model('Notice', NoticeSchema);

// module.exports = UserModel;




import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
    topic: { type: String, default: "" },
    date: { type: String, default: "" },
    description: { type: String, default: "" },
    subject_name: { type: String, default: "" },
    grade: { type: String, default: "" },
    teacher_id: { type: String, default: "" }
});

export const NoticeModel = mongoose.model('Notice', NoticeSchema);