// const mongoose = require('mongoose');

// const InstituteNoticeSchema = new mongoose.Schema({

//     I_topic: 'String',
//     I_date: 'String',
//     I_description: 'String',
   
// });

// const UserModel = mongoose.model('InstituteNotice', InstituteNoticeSchema);

// module.exports = UserModel;



import mongoose from "mongoose";

const InstituteNoticeSchema = new mongoose.Schema({
    I_topic: { type: String, default: "" },
    I_date: { type: String, default: "" },
    I_description: { type: String, default: "" }
});

export const InstituteNoticeModel = mongoose.model('InstituteNotice', InstituteNoticeSchema);