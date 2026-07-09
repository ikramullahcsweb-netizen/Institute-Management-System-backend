

import express from "express";
import cors from "cors";
import { 
    createnotice,
    viewnotice,
    getnotice,
    updatenotice,
    deletenotice
} from "../controllers/lessonmaterialController.js"; // .js extension zaroori hai

const router = express.Router();

// CORS Middleware Configuration
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

// Route to create a new notice
router.post('/createnotice', createnotice);

// Route to view all notices
router.get('/viewnotice', viewnotice);

// Route to get a specific notice by ID
router.get('/getnotice/:id', getnotice);

// Route to update a specific notice by ID
router.put('/updatenotice/:id', updatenotice);

// Route to delete a specific notice by ID
router.delete('/deletenotice/:id', deletenotice);

export default router;