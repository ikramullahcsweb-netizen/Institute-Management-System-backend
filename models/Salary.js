// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     TeacherName:'String',
//     TeacherID:'String',
//     SubjectName:'String',
//     Grade:'Number',
//     AttendStudents:'Number',
//     FreeCardAmount:'Number',
//     InstitutePayment:'Number',
//     MonthlySalary:'Number',
//     Date:'String',
//     upload_paymentFiles: 'String',

// });

// const SalaryModel = mongoose.model('salary',UserSchema);

// module.exports = SalaryModel;




import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    TeacherName: { type: String, default: "" },
    TeacherID: { type: String, default: "" },
    SubjectName: { type: String, default: "" },
    Grade: { type: String, default: "" },
    AttendStudents: { type: String, default: "" },
    FreeCardAmount: { type: String, default: "" },
    InstitutePayment: { type: String, default: "" },
    MonthlySalary: { type: String, default: "" },
    Date: { type: String, default: "" },
    upload_paymentFiles: { type: String, default: "" }
});

export const SalaryModel = mongoose.model('salary', UserSchema);