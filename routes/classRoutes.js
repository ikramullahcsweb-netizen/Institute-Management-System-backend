import { Router } from "express";
import { createClass, enrollStudentInClass, getMyClasses } from "../controllers/class.controllers.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = Router();

// Saare routes login protected hain
router.use(verifyJWT);

// 1. Class Create karna (Only Manager)
router.route("/create").post(authorizeRoles("manager"), createClass);

// 2. Student ko enroll karna (Manager assign kar sakta hai, ya Student khud ho sakta hai)
router.route("/enroll/:classId").post(authorizeRoles("manager", "student"), enrollStudentInClass);

// 3. Logged-in user ki apni classes mangwana (Student, Teacher, Manager sab ke liye dynamic)
router.route("/my-classes").get(authorizeRoles("manager", "teacher", "student"), getMyClasses);

export default router;