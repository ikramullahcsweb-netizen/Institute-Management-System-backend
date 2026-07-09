
import express from "express";
import cors from "cors";
import {
  test,
  Studenttimetable,
  AddnewClasstime,
  AlltimetableData,
  UpdateTimetable,
  getOneTimetableData,
  deleteTimetableData,
} from "../controllers/timetableController.js"; // .js extension zaroori hai

const router = express.Router();

// CORS Middleware Configuration
router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Base testing route
router.get("/", test);

// --- STUDENT ROUTES ---
// Route to get timetable for students
router.get("/Student/Timetable", Studenttimetable);

// --- MANAGER ROUTES ---
// Route to get all timetable data for manager
router.get("/Manager/Timetable", AlltimetableData);

// Route to add a new class time to the timetable
router.post("/Manager/Timetable/AddnewClasstime", AddnewClasstime);

// Route to get a specific timetable slot by ID
router.get("/Manager/Timetable/:id", getOneTimetableData);

// Route to update a specific timetable slot by ID
router.put("/Manager/UpdateT/:id", UpdateTimetable);

// Route to delete a specific timetable slot by ID
router.delete("/Manager/DeleteTimetable/:id", deleteTimetableData);

export default router;
