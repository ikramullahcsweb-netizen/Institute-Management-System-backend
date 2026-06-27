// const mongoose = require('mongoose');

// const RequestScheduleSchema=new mongoose.Schema({
//     teacher:'String',
//     classid:'String',
//     teacherid:'String',
//     date1:'String',
//     date2:'String',
//     date3:'String',
//     date4:'String',
//     grade:'Number',    
//     subject:'String',    
//     status: 'String',
// });

// const RequestScheduleModel=mongoose.model('requestschedule',RequestScheduleSchema);

// module.exports = RequestScheduleModel;





import mongoose from "mongoose";

const RequestScheduleSchema = new mongoose.Schema({
    teacher: { type: String, default: "" },
    classid: { type: String, default: "" },
    teacherid: { type: String, default: "" },
    date1: { type: String, default: "" },
    date2: { type: String, default: "" },
    date3: { type: String, default: "" },
    date4: { type: String, default: "" },
    grade: { type: String, default: "" },    
    subject: { type: String, default: "" },    
    status: { type: String, default: "" }
});

export const RequestScheduleModel = mongoose.model('requestschedule', RequestScheduleSchema);