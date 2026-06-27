import express from 'express';
import cors from 'cors';
import {
    createClassEnrollment,
    getAllClassEnrollments,
    getClassEnrollmentById,
    getAllClassIds,
    deleteClassEnrollment
} from '../controllers/classEnrollmentController.js'; // .js extension zaroori hai

const router = express.Router();

router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

router.post('/classenrollments', createClassEnrollment);
router.get('/classenrollments', getAllClassEnrollments);
router.get('/classenrollments/:id', getClassEnrollmentById);
router.delete('/classenrollments/:id', deleteClassEnrollment);
router.get('/classenrollments/classids', getAllClassIds);

router.get('/', (req, res) => {
    res.send('class management API');
});

export default router; // CommonJS ka 'module.exports' hata kar ye likhein