// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// const {
//    /*   createuser, */
//     getusers,
//     getusersid,
//     updateuser,
//     deleteuser
// } = require('../controllers/salaryController');

// //middleware
// router.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true
//     })
// )

// /* router.post('/createUser', createuser) */
// router.get('/users', getusers)
// router.get('/getUser/:id', getusersid)
// router.put('/updateUser/:id', updateuser)
// router.delete('/deleteUser/:id', deleteuser)


// module.exports = router;



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