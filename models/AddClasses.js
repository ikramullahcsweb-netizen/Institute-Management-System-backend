// const mongoose = require('mongoose');

// const AddClassesSchema=new mongoose.Schema({
    
//     teacher: 'String',
//     classid: 'String',
//     teacherid: 'String',
//     subject: 'String',
//     time:'String',
//     date:'String',
//     grade:'Number',

// });

// const AddClassesModel=mongoose.model('Class_details',AddClassesSchema);

// module.exports = AddClassesModel;

import mongoose from "mongoose";

const AddClassesSchema = new mongoose.Schema({
    teacher: { type: String },
    classid: { type: String },
    teacherid: { type: String },
    subject: { type: String },
    time: { type: String },
    date: { type: String },
    // Yeh String dono tarah ka data (Pure Numbers aur Strings) handle kar lega safely
    grade: { type: String } 
});

export const AddClassesModel = mongoose.model('Class_details', AddClassesSchema);