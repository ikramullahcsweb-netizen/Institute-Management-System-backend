// const mongoose = require('mongoose');

// const ProfilePhotoSchema = new mongoose.Schema({

//     profile_photo: 'String',
//     student_id: 'String'

// });

// const PhotoModel = mongoose.model('Photo', ProfilePhotoSchema);

// module.exports = PhotoModel;


import mongoose from "mongoose";

const ProfilePhotoSchema = new mongoose.Schema({
    profile_photo: { type: String, default: "" },
    student_id: { type: String, default: "" }
});

export const PhotoModel = mongoose.model('Photo', ProfilePhotoSchema);