// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const userSchema = new Schema(
//   {
//     // --- BASIC AUTH INFO ---
//     first_name: { type: String, required: true, trim: true },
//     last_name: { type: String, trim: true },
//     email_address: { 
//       type: String, 
//       required: true, 
//       unique: true, 
//       lowercase: true, 
//       trim: true, 
//       index: true 
//     },
//     password: { type: String, required: [true, "Password is required"] },
    
//     // Role handling: Saare roles yahan define hain
//     role: { 
//       type: String, 
//       enum: [ "manager", "admin"], 
//       default: "admin" 
//     },

//     // --- SHARED FIELDS ---
//     mobile_no: { 
//       type: String, 
//       trim: true,
//       // validate: {
//       //   validator: function(v) { return !v || v.length === 10; }, // 10 digit validation
//       //   message: "Mobile number must be exactly 10 digits."
//       // }
//     },
//     gender: { type: String },
//     SecAnswer: { type: String },
//     refreshToken: { type: String },

//     // --- STUDENT SPECIFIC FIELDS ---
//     stdid: { type: String, unique: true, sparse: true }, 
//     grade: { type: String },
//     parentname: { type: String },
//     parentphonenumber: { type: String },

//     // --- TEACHER SPECIFIC FIELDS ---
//     teid: { type: String, unique: true, sparse: true },
//     subject: { type: String }
//   },
//   { timestamps: true }
// );

// // --- PASSWORD HASHING ---
// userSchema.pre("save", async function next(){
//   if (!this.isModified("password")) return ;
//   this.password = await bcrypt.hash(this.password, 10);
  
// });

// // --- METHODS ---
// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     { _id: this._id, email_address: this.email_address, role: this.role },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     { _id: this._id },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//   );
// };

// export const User = mongoose.model("User", userSchema);


// // import mongoose, { Schema } from "mongoose";
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";

// // const userSchema = new Schema(
// //   {
// //     first_name: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     last_name: {
// //       type: String,
// //       trim: true,
// //     },
// //     email_address: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       lowercase: true,
// //       trim: true,
// //       index: true,
// //       validate: {
// //         validator: function (v) {
// //           return v.includes('@gmail') && v.endsWith('.com');
// //         },
// //         message: "Invalid email format! Email must contain '@' and end with '.com'."
// //       }
    
// //     },
// //     mobile_no: {
// //       type: String,
// //       trim: true,
// //       validate: {
// //         validator: function (v) {
// //           if (!v) return true; 
          
// //           return v.length === 10;
// //         },
// //         message: function(props) {
          
// //           if (props.value.length < 10) {
// //             return `Mobile number is too short! It is only ${props.value.length} characters long, but it must be exactly 10 characters.`;
// //           }
// //           if (props.value.length > 10) {
// //             return `Mobile number is too long! It is ${props.value.length} characters long, but it must be exactly 10 characters.`;
// //           }
// //           return "Invalid mobile number format!";
// //         }
// //       }
// //     },
  
// //     password: {
// //       type: String,
// //       required: [true, "Password is required"],
// //     },
    
// //     refreshToken: {
// //       type: String,
// //     },
// //     role: { 
// //       type: String, 
// //       enum: ["manager","admin"], // Sirf yeh 3 roles allowed hain
// //       default: "admin" 
// //     }
// //   },
// //   { timestamps: true }
// // );

// // userSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return 
// //   this.password = await bcrypt.hash(this.password, 10);

// // });

// // userSchema.methods.isPasswordCorrect = async function (password) {
// //   return await bcrypt.compare(password, this.password);
// // };

// // userSchema.methods.generateAccessToken = function () {
// //   return jwt.sign(
// //     {
// //       _id: this._id,
// //       email_address: this.email_address,
// //       first_name: this.first_name,
// //     },
// //     process.env.ACCESS_TOKEN_SECRET,
// //     {
// //       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
// //     }
// //   );
// // };

// // userSchema.methods.generateRefreshToken = function () {
// //   return jwt.sign(
// //     {
// //       _id: this._id,
// //     },
// //     process.env.REFRESH_TOKEN_SECRET,
// //     {
// //       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
// //     }
// //   );
// // };

// // export const User = mongoose.model("User", userSchema);






import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, trim: true },
    email_address: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    mobile_no: { type: String, trim: true },
    password: { type: String, required: [true, "Password is required"] },
    refreshToken: { type: String },
    SecAnswer: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "manager"],
      default: "admin",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 10);
  
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email_address: this.email_address, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);