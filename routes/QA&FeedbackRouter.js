


import express from "express";
import cors from "cors";
import {
    createque,
    allque,
    getupdateque,
    updateque,
    deleteque,
    getteacherque,
    giveans,
    updateans,
    showans,
    getans,
    updateanswer,
    deleteanswer,
    displayfaq,
    searchfaq,
    createteacherfeedback,
    createservicefeedback,
    getteacherfeedback,
    getservicefeedback,
    getteacherfeedbackid,
    updateteacherfeedbackid,
    deleteteacherfeedbackid,
    getservicefeedbackid,
    deleteservicefeedbackid,
    updateservicefeedbackid,
    servicefeedbackid,
    giveresponse,
    gettoreply,
    showfeedback,
    getreply,
    updatereply,
    deletereply
} from "../controllers/QA&FeedbackController.js"; // .js extension zaroori hai

const router = express.Router();

// CORS Middleware Configuration
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

// --- 1. QUESTIONS & ANSWERS (Q&A) ROUTES ---
router.post('/createQ', createque);
router.get('/Myquestions', allque);
router.get('/getQuestion/:id', getupdateque);
router.put('/updateQuestion/:id', updateque);
router.delete('/deleteQuestion/:id', deleteque);
router.get('/getTQuestions', getteacherque);

// Answers handling
router.get('/giveToAnswers/:id', giveans);
router.put('/getToAnswers/:id', updateans);
router.get('/questionsShow', showans);
router.get('/getAnswer/:id', getans);
router.put('/updateAnswers/:id', updateanswer);
router.put('/deleteAnswer/:id', deleteanswer);

// --- 2. FAQ ROUTES ---
router.get('/fAskQs', displayfaq);
router.get('/fASearch', searchfaq);

// --- 3. TEACHER FEEDBACK ROUTES ---
router.post('/createTF', createteacherfeedback);
router.get('/MyTFeedbacks', getteacherfeedback);
router.get('/getTFeedback/:id', getteacherfeedbackid);
router.put('/updateTFeedback/:id', updateteacherfeedbackid);
router.delete('/deleteTFeedback/:id', deleteteacherfeedbackid);

// --- 4. SERVICE & MANAGER FEEDBACK ROUTES ---
router.post('/createSF', createservicefeedback);
router.get('/MySFeedbacks', getservicefeedback);
router.get('/getSFeedback/:id', getservicefeedbackid);
router.put('/updateSFeedback/:id', updateservicefeedbackid);
router.delete('/deleteSFeedback/:id', deleteservicefeedbackid);
router.get('/getMFeedbacks', servicefeedbackid);

// Feedback Replies handling
router.get('/giveToReply/:id', giveresponse);
router.put('/getToReply/:id', gettoreply);
router.get('/feedbacksShow', showfeedback);
router.get('/getReply/:id', getreply);
router.put('/updateReply/:id', updatereply);
router.put('/deleteReply/:id', deletereply);

export default router;