// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// const { createSubject,
//     getSubject,
//     getSubjectid,
//     getSubjectname
// } = require('../controllers/subjectController');

// //middleware
// router.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true
//     })
// )

// router.post('/createSubject', createSubject)
// router.get('/viewSubject', getSubject)
// router.get('/getSubject/:id', getSubjectid)
// router.get('/getSubjectname/:name/:grade', getSubjectname)


// module.exports = router;

import express from 'express';
import cors from 'cors';
import { 
    createSubject,
    getSubject,
    getSubjectid,
    getSubjectname
} from '../controllers/subjectController.js'; // .js extension zaroori hai

const router = express.Router();

// Middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

router.post('/createSubject', createSubject);
router.get('/viewSubject', getSubject);
router.get('/getSubject/:id', getSubjectid);
router.get('/getSubjectname/:name/:grade', getSubjectname);

export default router; // CommonJS ka 'module.exports' hata kar ye likhein