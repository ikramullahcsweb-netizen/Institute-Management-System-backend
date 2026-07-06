
import mongoose from "mongoose";

const AddAdditionalClassesSchema = new mongoose.Schema({
    teacher: String,
    grade: String, 
    date: String,
    hall: String,
    subject: String,
    time: String,
    status: String
});

export const AddAdditionalClassesModel = mongoose.model('AdditionalClasses', AddAdditionalClassesSchema);