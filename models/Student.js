
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    contactnumber: { type: String, default: "" },
    grade: { type: String, required: [true, "Grade is required"] },
    stdid: { type: String, required: [true, "Student ID is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
    gender: { type: String, default: "Male" },
    parentname: { type: String, default: "" },
    parentphonenumber: { type: String, default: "" },
    SecAnswer: { type: String, default: "" },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 10);
  ;
});

studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, role: "student" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const StudentModel = mongoose.model("student_details", studentSchema);