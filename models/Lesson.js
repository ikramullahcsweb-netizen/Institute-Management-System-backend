// const mongoose = require('mongoose');

// const LessonSchema = new mongoose.Schema({

//     lesson_Files: 'String',
//     lesson_topic: 'String',
//     lesson_fileType: 'String',
//     lesson_date: 'String',
//     lesson_description: 'String',
//     subject_name: 'String',
//     grade: 'Number',
//     teacher_id: 'String',
//     teachername: 'String'

// });

// const UserModelLesson = mongoose.model('Lesson', LessonSchema);

// module.exports = UserModelLesson;


// import mongoose from "mongoose";

// const LessonSchema = new mongoose.Schema({
//     lesson_Files: { type: String, default: "" },
//     lesson_topic: { type: String, default: "" },
//     lesson_fileType: { type: String, default: "" },
//     lesson_date: { type: String, default: "" },
//     lesson_description: { type: String, default: "" },
//     subject_name: { type: String, default: "" },
//     grade: { type: String, default: "" },
//     teacher_id: { type: String, default: "" },
//     teachername: { type: String, default: "" }
// });

// export const LessonModel = mongoose.model('Lesson', LessonSchema);


import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
    lesson_Files: { type: String, default: "" },
    lesson_topic: { type: String, default: "" },
    lesson_fileType: { type: String, default: "" },
    lesson_date: { type: String, default: "" },
    lesson_description: { type: String, default: "" },
    subject_name: { type: String, default: "" },
    grade: { type: String, default: "" },
    teacher_id: { type: String, default: "" },
    teachername: { type: String, default: "" }
});

export const LessonModel = mongoose.model('Lesson', LessonSchema);