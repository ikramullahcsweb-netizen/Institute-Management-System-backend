import express from 'express';
import {
    createClassEnrollment,
    getAllClassEnrollments,
    getClassEnrollmentById,
    getAllClassIds,
    deleteClassEnrollment
} from '../controllers/classEnrollmentController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/classenrollments', verifyJWT, createClassEnrollment);
router.get('/classenrollments', verifyJWT, getAllClassEnrollments);
router.get('/classenrollments/classids', verifyJWT, getAllClassIds);
router.get('/classenrollments/:id', verifyJWT, getClassEnrollmentById);
router.delete('/classenrollments/:id', verifyJWT, deleteClassEnrollment);

export default router;