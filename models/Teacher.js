
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true, index: true },
  contactnumber: { type: String, required: [true, "Contact number is required"] },
  teid: { type: String, required: [true, "Teacher ID is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  gender: { type: String, required: [true, "Gender is required"] },
  subject: { type: String, required: [true, "Subject is required"] },
  SecAnswer: { type: String, default: "" },
  refreshToken: { type: String }
}, { timestamps: true });

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 10);
  
});

teacherSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
teacherSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id, email: this.email, role: "teacher" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};
teacherSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

export const TeacherModel = mongoose.model("teacher_details", teacherSchema);