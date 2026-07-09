

import express from "express";
import {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    deleteAttendance
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post('/attendancemark', createAttendance);
router.get('/attendancemark', getAllAttendance);
router.get('/attendancemark/:id', getAttendanceById);
router.delete('/attendancemark/:id', deleteAttendance);

export default router;