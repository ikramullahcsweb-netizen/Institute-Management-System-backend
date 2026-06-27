// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//   email: { 
//     type: String, 
//     required: [true, 'Email is required'], 
//     unique: true,
//     lowercase: true,
//     trim: true,
//     index: true // Indexing: Search performance fast karne ke liye
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Password is required'],
//     minlength: 6 
//   },
//   role: { 
//     type: String, 
//     enum: ['admin', 'manager', 'teacher', 'student'], 
//     default: 'student',
//     index: true // Indexing: Role-based filtering fast hogi
//   },
//   permissions: [{ 
//     type: String 
//   }],
//   isActive: { type: Boolean, default: true },
//   lastLogin: { type: Date } // Audit Trail ke liye zaroori hai
// }, { timestamps: true }); // createdAt aur updatedAt automatic ban jayenge

// // Password hashing
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Password verification
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);





import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email_address: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: function (v) {
          return v.includes('@gmail') && v.endsWith('.com');
        },
        message: "Invalid email format! Email must contain '@' and end with '.com'."
      }
    
    },
    mobile_no: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; 
          
          return v.length === 10;
        },
        message: function(props) {
          
          if (props.value.length < 10) {
            return `Mobile number is too short! It is only ${props.value.length} characters long, but it must be exactly 10 characters.`;
          }
          if (props.value.length > 10) {
            return `Mobile number is too long! It is ${props.value.length} characters long, but it must be exactly 10 characters.`;
          }
          return "Invalid mobile number format!";
        }
      }
    },
  
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    
    refreshToken: {
      type: String,
    },
    role: { 
      type: String, 
      enum: [ "teacher", "manager","admin"], // Sirf yeh 3 roles allowed hain
      default: "student" // Agar kuch na aaye toh automatically student save ho
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return 
  this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email_address: this.email_address,
      first_name: this.first_name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);