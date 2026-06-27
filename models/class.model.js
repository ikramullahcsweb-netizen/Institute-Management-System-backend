
import mongoose, { Schema } from "mongoose";

const ClassSchema = new mongoose.Schema({
  className: { 
    type: String, 
    required: [true, 'Class name is required'],
    trim: true 
  },
  subject: { 
    type: String, 
    required: [true, 'Subject is required'],
    trim: true 
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true // Har class ka ek teacher hona lazmi hai
  },
  schedule: { 
    type: String, // Yahan tum 'Monday 10:00 AM' jaise strings store kar sakte ho
    default: 'To be announced' 
  },
  enrolledStudents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  maxCapacity: { 
    type: Number, 
    default: 50 // Production best practice: capacity limit set karo
  }
}, { timestamps: true });

// 🚀 Modern ES Module Export (Jo classController dhoond raha hai)
export  const Class = mongoose.model('Class', ClassSchema);
