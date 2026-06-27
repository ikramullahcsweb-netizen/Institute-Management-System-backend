// const mongoose = require('mongoose');

// const AttendanceSchema = new mongoose.Schema({
//     studentId: {
//         type: String,
//         required: true
//     },
//     classId: {
//         type: String,
//         required: true
//     },
//     teacherId: {
//         type: String

//     },
//     subject: {
//         type: String
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     time: {
//         type: String,
//         default: function() {
//             const date = new Date();
//             return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//         }
//     }
// });

// const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);

// module.exports = AttendanceModel;





import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: [true, "Student ID is required"]
    },
    classId: {
        type: String,
        required: [true, "Class ID is required"]
    },
    teacherId: {
        type: String,
        default: "" // Frontend se baad mein add ho toh crash na ho
    },
    subject: {
        type: String,
        default: "" // Frontend safe fallback
    },
    date: {
        type: String, 
        // Agar frontend se date nahi aati, toh yeh automatically "YYYY-MM-DD" save kar lega
        default: () => new Date().toISOString().split('T')[0] 
    },
    time: {
        type: String,
        default: () => {
            const date = new Date();
            // PadStart lagaya hai taaki "9:5:2" ki bajah standard format "09:05:02" mein time save ho
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }
    }
});

export const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);