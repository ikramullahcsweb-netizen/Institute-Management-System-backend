// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import connectDB from "./config/db.js"; // Aapka central DB connection file

// ;
// // --- MODELS IMPORTS (FIXED) ---
// import { UserModelLesson } from "./models/Lesson.js"; // Curly braces add karein
// import { BankModel } from "./models/BankPayments.js";
// import { SalaryModel } from "./models/Salary.js";
// import { PhotoModel } from "./models/ProfilePhoto.js";

// // --- ROUTES IMPORTS ---
// import authRouters from "./routes/authRouters.js";
// import timetableRouter from "./routes/timetableRouter.js";
// import InstituenoticeRouter from "./routes/InstituenoticeRouter.js";
// import LessonMaterialRouter from "./routes/LessonMaterialRouter.js";
// import paymentRouters from "./routes/paymentRouters.js";
// import QAFeedbackRouter from "./routes/QA&FeedbackRouter.js";
// import salaryRouters from "./routes/salaryRouters.js";
// import classRouter from "./routes/classRouter.js";
// import subjectRouter from "./routes/subjectRouter.js";
// import attendanceRouters from "./routes/attendanceRouters.js";
// import EnrollmentsRouter from "./routes/EnrollmentsRouter.js";
// import studentRoutes from "./routes/studentRoutes.js";

// // Load Environment Variables
// dotenv.config();

// // Initialize Express App
// const app = express();

// // Database Connection
// connectDB(); 

// // ES Modules __dirname configuration fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // --- 🌟 DYNAMIC CORS CONFIGURATION (MULTIPLE PORTS ALLOWED) ---
// // .env se saare URLs ko comma se alag karke array bana raha hai
// const allowedOrigins = process.env.CLIENT_URL 
//     ? process.env.CLIENT_URL.split(",") 
//     : ["http://localhost:5173"];

// app.use(cors({
//     origin: function (origin, callback) {
//         // Agar request bina origin ke ho (jaise Postman) ya allowedOrigins list mein maujood ho
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error("CORS Policy: This origin is not allowed by Step2Scientist Security!"));
//         }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
// }));

// // Dynamic CORS Header Injection (For Errors like 409 Conflict & 500 Server Issues)
// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.header("Access-Control-Allow-Origin", origin); // Jo port request bhejega, wahi allow hoga
//     }
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
//     if (req.method === "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// });

// // Standard Parsers
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

// // Static Asset Deployment Configuration
// app.use("/files", express.static(path.join(__dirname, "files")));
// app.use("/files2", express.static(path.join(__dirname, "files2")));
// app.use("/files3", express.static(path.join(__dirname, "files3")));
// app.use("/ProfilePhotos", express.static(path.join(__dirname, "ProfilePhotos")));


// // --- MULTER MODULAR STORAGE SYSTEM ---
// const createMulterStorage = (destinationPath) => {
//     return multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, destinationPath);
//         },
//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now();
//             cb(null, uniqueSuffix + file.originalname);
//         },
//     });
// };

// const upload = multer({ storage: createMulterStorage("./files") });         // Lesson Materials
// const upload2 = multer({ storage: createMulterStorage("./files2") });       // Bank Payments
// const upload3 = multer({ storage: createMulterStorage("./files3") });       // Salary Records
// const upload4 = multer({ storage: createMulterStorage("./ProfilePhotos") }); // Profile Photos


// // --- CENTRAL ROUTE MANAGER (ALL API ENDPOINTS) ---
// app.use("/api/auth", authRouters);
// app.use("/api/classes", classRouter);
// app.use("/api/timetable", timetableRouter);
// app.use("/api/notices", InstituenoticeRouter);
// app.use("/api/lessons", LessonMaterialRouter);
// app.use("/api/payments", paymentRouters);
// app.use("/api/feedback", QAFeedbackRouter);
// app.use("/api/salaries", salaryRouters);
// app.use("/api/subjects", subjectRouter);
// app.use("/api/attendance", attendanceRouters);
// app.use("/api/enrollments", EnrollmentsRouter);
// app.use("/api/students", studentRoutes);


// // --- INLINE DATA FILE PROCESSING OPERATIONS ---

// // Module 1: Lesson Materials Engine
// app.post('/addmaterial', upload.single('file'), (req, res) => {
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
//     const { filename } = req.file;

//     UserModelLesson.create({
//         lesson_Files: filename,
//         lesson_topic: req.body.lesson_topic,
//         lesson_fileType: req.body.lesson_fileType,
//         lesson_date: req.body.lesson_date,
//         lesson_description: req.body.lesson_description,
//         subject_name: req.body.subject_name,
//         grade: req.body.grade,
//         teacher_id: req.body.teacher_id,
//         teachername: req.body.teachername
//     })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(500).json({ error: 'Internal server error' }));
// });

// app.get('/showmaterials', (req, res) => {
//     UserModelLesson.find()
//         .then(MyClasses => res.json(MyClasses))
//         .catch(err => res.status(500).json({ error: 'Internal server error' }));
// });

// app.get('/getmaterial/:id', (req, res) => {
//     UserModelLesson.findById({ _id: req.params.id })
//         .then(MyClasses => res.json(MyClasses))
//         .catch(err => res.status(500).json({ error: 'Internal server error' }));
// });

// app.put('/updatematerial/:id', (req, res) => {
//     UserModelLesson.findByIdAndUpdate({ _id: req.params.id }, {
//         lesson_topic: req.body.lesson_topic,
//         lesson_date: req.body.lesson_date,
//         lesson_fileType: req.body.lesson_fileType,
//         lesson_description: req.body.lesson_description,
//     }, { new: true })
//         .then(MyClasses => res.json(MyClasses))
//         .catch(err => res.status(500).json({ error: 'Internal server error' }));
// });

// app.delete('/deletematerial/:id', (req, res) => {
//     UserModelLesson.findByIdAndDelete({ _id: req.params.id })
//         .then(MyClasses => res.json(MyClasses))
//         .catch(err => res.status(500).json({ error: 'Internal server error' }));
// });

// // Module 2: Bank Statement Ledger
// app.post('/createbank', upload2.single('file'), (req, res) => {
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
//     const { filename } = req.file;

//     BankModel.create({
//         itnumber: req.body.itnumber,
//         accountname: req.body.accountname,
//         accountnumber: req.body.accountnumber,
//         bankname: req.body.bankname,
//         description: req.body.description,
//         date: req.body.date,
//         amount: req.body.amount,
//         status: req.body.status,
//         type: req.body.type,
//         upload_files: filename
//     })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(500).json({ error: 'Internal server error' }));
// });

// // Module 3: Payroll / Salary Processing
// app.post('/createSalary', upload3.single('file'), (req, res) => {
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
//     const { filename } = req.file;

//     SalaryModel.create({
//         TeacherName: req.body.TeacherName,
//         TeacherID: req.body.TeacherID,
//         SubjectName: req.body.SubjectName,
//         Grade: req.body.Grade,
//         AttendStudents: req.body.AttendStudents,
//         FreeCardAmount: req.body.FreeCardAmount,
//         InstitutePayment: req.body.InstitutePayment,
//         MonthlySalary: req.body.MonthlySalary,
//         Date: req.body.Date,
//         upload_paymentFiles: filename
//     })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(500).json({ error: 'Internal server error' }));
// });

// // Module 4: Bio Profile Images
// app.post('/addphoto', upload4.single('file'), (req, res) => {
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
//     const { filename } = req.file;

//     PhotoModel.create({
//         profile_photo: filename,
//         student_id: req.body.student_id
//     })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(500).json({ error: 'Internal server error' }));
// });

// app.get("/getimage/:studentId", async (req, res) => {
//     try {
//         const studentId = req.params.studentId;
//         const data = await PhotoModel.findOne({ student_id: studentId });
//         if (!data) {
//             return res.status(404).json({ error: 'Profile photo not found for this student ID' });
//         }
//         res.status(200).json({ status: "ok", data: data });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.delete('/deletephoto/:id', (req, res) => {
//     PhotoModel.findByIdAndDelete({ _id: req.params.id })
//         .then(() => res.status(200).json({ message: 'Photo deleted successfully' }))
//         .catch(err => res.status(500).json({ error: 'Internal server error' }));
// });

// // --- SYSTEM DIAGNOSTIC HEALTH CHECK ---
// app.get('/', (req, res) => {
//     res.status(200).json({ 
//         status: 'success', 
//         message: 'Step2Scientist Core Architecture API is fully operational 🚀' 
//     });
// });

// // --- SERVER INSTANTIATION ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(` Server executing in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });











import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// --- MODELS (Named Imports: { } zaroori hai) ---
import { LessonModel } from "./models/Lesson.js";
import { BankModel } from "./models/BankPayments.js";
import { SalaryModel } from "./models/Salary.js";
import { PhotoModel } from "./models/ProfilePhoto.js";

// --- ROUTES (Default Imports: { } mat lagayein) ---
import authRouters from "./routes/authRouters.js";
import timetableRouter from "./routes/timetableRouter.js";
import InstituenoticeRouter from "./routes/InstituenoticeRouter.js";
import LessonMaterialRouter from "./routes/LessonMaterialRouter.js";
import paymentRouters from "./routes/paymentRouters.js";
import QAFeedbackRouter from "./routes/QA&FeedbackRouter.js";
import salaryRouters from "./routes/salaryRouters.js";
import classRouter from "./routes/classRouter.js";
import subjectRouter from "./routes/subjectRouter.js";
import attendanceRouters from "./routes/attendanceRouters.js";
import EnrollmentsRouter from "./routes/EnrollmentsRouter.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CORS & MIDDLEWARES ---
app.use(cors({
    origin: ["http://localhost:5173"], // Sirf apna frontend origin den
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Zaroori hai agar aap cookies/tokens use kar rahe hain
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Static Assets
app.use("/files", express.static(path.join(__dirname, "files")));
app.use("/files2", express.static(path.join(__dirname, "files2")));
app.use("/files3", express.static(path.join(__dirname, "files3")));
app.use("/ProfilePhotos", express.static(path.join(__dirname, "ProfilePhotos")));

// --- MULTER STORAGE ---
const createMulterStorage = (dest) => multer.diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage: createMulterStorage("./files") });
const upload2 = multer({ storage: createMulterStorage("./files2") });
const upload3 = multer({ storage: createMulterStorage("./files3") });
const upload4 = multer({ storage: createMulterStorage("./ProfilePhotos") });

// --- CENTRAL ROUTE MANAGER ---
app.use("/api/auth", authRouters);
app.use("/api/classes", classRouter);
app.use("/api/timetable", timetableRouter);
app.use("/api/notices", InstituenoticeRouter);
app.use("/api/lessons", LessonMaterialRouter);
app.use("/api/payments", paymentRouters);
app.use("/api/feedback", QAFeedbackRouter);
app.use("/api/salaries", salaryRouters);
app.use("/api/subjects", subjectRouter);
app.use("/api/attendance", attendanceRouters);
app.use("/api/enrollments", EnrollmentsRouter);
app.use("/api/students", studentRoutes);

// --- HEALTH CHECK ---
app.get('/', (req, res) => res.json({ message: 'API is running' }));

// --- SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));