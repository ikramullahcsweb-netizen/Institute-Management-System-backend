


import express from "express";
import cors from "cors";
import {
    getusers,
    getusersid,
    updateuser,
    deleteuser
} from "../controllers/salaryController.js"; // .js extension zaroori hai

const router = express.Router();

// CORS Middleware Configuration
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

// --- SALARY / USER ROUTES ---

// Route to get all salary users
router.get('/users', getusers);

// Route to get a specific salary user by ID
router.get('/getUser/:id', getusersid);

// Route to update salary user details by ID
router.put('/updateUser/:id', updateuser);

// Route to delete a salary user record by ID
router.delete('/deleteUser/:id', deleteuser);

export default router;