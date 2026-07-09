
import express from 'express';
import { 
    createSubject,
    getSubject,
    getSubjectid,
    getSubjectname
} from '../controllers/subjectController.js';

const router = express.Router();

router.post('/createSubject', createSubject);
router.get('/viewSubject', getSubject);
router.get('/getSubject/:id', getSubjectid);
router.get('/getSubjectname/:name/:grade', getSubjectname);

export default router;