
import express from "express";
import cors from "cors";
import {
    createaddadditionalclass,
    createshedule,
    getallreqadiclass,
    getallreqsch,
    getclass,
    addclass,
    updateclassid,
    updateclass,
    deleteclass,
    getadditionalclass,
    updateadditionalclass,
    getadditionalclassid,
    updateadditionalclassid,
    getadditionalclassextra,
    getschedule,
    deleteadditionalclass,
    deleteschedule
} from "../controllers/classController.js"; // .js extension mandatory hai

const router = express.Router();

// CORS Middleware Configuration
// router.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true
//     })
// );

// --- CLASS CREATION & MANAGEMENT ---
router.post('/addclass', addclass);
router.get('/teachermyclasses/addclasses', getclass);
router.get('/getClass/:id', updateclassid);
router.put('/updateClass/:id', updateclass);
router.delete('/deleteClass/:id', deleteclass);

// --- ADDITIONAL CLASSES & SCHEDULES ---
router.post('/createaddadditionalclass', createaddadditionalclass);
router.post('/createschedule', createshedule);
router.get('/requestedadditionalclasses/additionalclasses', getallreqadiclass);
router.get('/requestedadditionalclasses/schedules', getallreqsch);


router.get('/approveclass/:id', getadditionalclass);
router.get('/approveclass/detail/:id', getadditionalclassid); // Path thoda change kiya taaki conflict na ho

router.put('/request/:id', updateadditionalclass);
router.put('/request/update/:id', updateadditionalclassid); // Path thoda change kiya taaki conflict na ho

router.get('/additionalclasses/approveclasses/extra', getadditionalclassextra); // Path clear kiya
router.get('/additionalclasses/approveclasses/schedule', getschedule); // Path clear kiya

// --- DELETIONS ---
router.delete('/deleteAdditionalClass/:id', deleteadditionalclass);
router.delete('/deleteSchedule/:id', deleteschedule);

export default router;