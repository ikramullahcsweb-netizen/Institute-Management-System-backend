
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