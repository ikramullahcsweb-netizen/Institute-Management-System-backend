// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import connectDB from "./config/db.js";

// // --- MODELS (Named Imports: { } zaroori hai) ---
// import { LessonModel } from "./models/Lesson.js";
// import { BankModel } from "./models/BankPayments.js";
// import { SalaryModel } from "./models/Salary.js";
// import { PhotoModel } from "./models/ProfilePhoto.js";

// // --- ROUTES (Default Imports: { } mat lagayein) ---
// import studentRoutes from "./routes/studentRoutes.js";
// import teacherRoutes from "./routes/teacherRoutes.js";
// import adminManagerRoutes from "./routes/adminManagerRoutes.js";
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

// dotenv.config();
// const app = express();
// connectDB();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // --- CORS & MIDDLEWARES ---
// app.use(cors({
//     origin: ["http://localhost:5173"], // Sirf apna frontend origin den
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true, // Zaroori hai agar aap cookies/tokens use kar rahe hain
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

// // Static Assets
// app.use("/files", express.static(path.join(__dirname, "files")));
// app.use("/files2", express.static(path.join(__dirname, "files2")));
// app.use("/files3", express.static(path.join(__dirname, "files3")));
// app.use("/ProfilePhotos", express.static(path.join(__dirname, "ProfilePhotos")));

// // --- MULTER STORAGE ---
// const createMulterStorage = (dest) => multer.diskStorage({
//     destination: (req, file, cb) => cb(null, dest),
//     filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
// });

// const upload = multer({ storage: createMulterStorage("./files") });
// const upload2 = multer({ storage: createMulterStorage("./files2") });
// const upload3 = multer({ storage: createMulterStorage("./files3") });
// const upload4 = multer({ storage: createMulterStorage("./ProfilePhotos") });

// // --- CENTRAL ROUTE MANAGER ---
// app.use("/api/v1", studentRoutes);
// app.use("/api/v1", teacherRoutes);
// app.use("/api/auth", adminManagerRoutes);
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

// // --- HEALTH CHECK ---
// app.get('/', (req, res) => res.json({ message: 'API is running' }));

// // --- SERVER ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



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
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import adminManagerRoutes from "./routes/adminManagerRoutes.js";
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

dotenv.config();
const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CORS & MIDDLEWARES ---
app.use(cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"], // ⚠️ Vercel par deploy ke baad apne live frontend ka URL bhi yahan zaroor add kar dena
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Zaroori hai agar aap cookies/tokens use kar rahe hain
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Static Assets (⚠️ Note: Vercel serverless hai, isliye runtime par upload ki gayi files yahan temporary save hongi aur kuch der mein delete ho jayengi)
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
app.use("/api/v1", studentRoutes);
app.use("/api/v1", teacherRoutes);
app.use("/api/auth", adminManagerRoutes);
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

// --- HEALTH CHECK ---
app.get('/', (req, res) => res.json({ message: 'API is running' }));

// --- SERVER (Vercel Integration) ---
// Local development mein yeh manually start hoga, Vercel par automatically render hoga
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Vercel ke serverless handler ke liye app export karna zaroori hai
export default app;
