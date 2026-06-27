// const express = require('express');
// const router = express.Router();
// const studentController = require('../controllers/studentController.js');

// // Routes for CRUD operations on students
// router.post('/students', studentController.createStudent);
// router.get('/students', studentController.getAllStudents);
// router.get('/students/:id', studentController.getStudentById);
// router.put('/students/:id', studentController.updateStudentById);
// router.delete('/students/:id', studentController.deleteStudentById);

// module.exports = router;


import express from "express";
// Curly braces { } ke andar functions ko import karein
import { 
    createStudent, 
    getAllStudents, 
    getStudentById, 
    updateStudentById, 
    deleteStudentById 
} from "../controllers/studentController.js";

const router = express.Router();

// --- STUDENT CRUD ROUTES ---

// Route to create a new student record
router.post('/students', createStudent);

// Route to get a list of all students
router.get('/students', getAllStudents);

// Route to get details of a specific student by ID
router.get('/students/:id', getStudentById);

// Route to update a student's information by ID
router.put('/students/:id', updateStudentById);

// Route to delete a student record by ID
router.delete('/students/:id', deleteStudentById);

export default router;