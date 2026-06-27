import express from 'express';
import cors from 'cors';
import { 
    InstituteNotices,
    createInstituteNotices,
    deleteInstituteNotices 
} from '../controllers/InstituenoticeController.js'; // .js extension add karna na bhulein

const router = express.Router();

// Middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

router.get('/getinstitutenotices', InstituteNotices);
router.get('/createInstitutenotice', createInstituteNotices);
router.get('/deleteInotice/:id', deleteInstituteNotices);

export default router; // CommonJS ka 'module.exports' hata kar ye likhein