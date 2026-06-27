// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// const { test,
//     Studenttimetable,
//     AddnewClasstime,
//     ManagerTimetable,
//     AlltimetableData,
//     UpdateTimetable,
//     getOneTimetableData,
//     deleteTimetableData
// } = require('../controllers/timetableController');

// //middleware
// router.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true
//     })
// )
// router.get('/', test)
// router.get('/Student/Timetable', Studenttimetable);
// router.get('/Manager/Timetable',   AlltimetableData);
// router.post('/Manager/Timetable/AddnewClasstime', AddnewClasstime);
// router.put('/Manager/UpdateT/:id', UpdateTimetable);
// router.get('/Manager/Timetable/:id', getOneTimetableData);
// router.delete('/Manager/DeleteTimetable/:id', deleteTimetableData);
// module.exports = router;




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
