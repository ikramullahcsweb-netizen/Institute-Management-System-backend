
import express from "express";
import cors from "cors";
import {
    createonline,
    getonline,
    getpayment,
    updateonline,
    deleteonline,
    getbank,
    getbankid,
    updatebank,
    deletebank,
    createcash,
    getcash,
    getcashid,
    deletecash,
    createwallet,
    getwallet,
    getwalletid,
    updatewallet,
    allpayments,
    manageronline,
    managerbank,
    managercash
} from "../controllers/paymentController.js"; // .js extension zaroori hai

const router = express.Router();

// CORS Middleware Configuration
// router.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true
//     })
// );

// --- GENERAL PAYMENTS ---
router.get('/allpayments', allpayments);

// --- ONLINE PAYMENTS ---
router.post('/createonline', createonline);
router.get('/displayonline', getonline);
router.get('/getpayment/:id', getpayment);
router.put('/updatepayment/:id', updateonline);
router.delete('/deletepayment/:id', deleteonline);

// --- BANK PAYMENTS ---
router.get('/displaybank', getbank);
router.get('/getbank/:id', getbankid);
router.put('/updatebank/:id', updatebank);
router.delete('/deletebank/:id', deletebank);

// --- CASH PAYMENTS ---
router.post('/createcash', createcash);
router.get('/displaycash', getcash);
router.get('/getcash/:id', getcashid);
router.delete('/deletecash/:id', deletecash);

// --- WALLET PAYMENTS ---
router.post('/createwallet', createwallet);
router.get('/displaywallet', getwallet);
router.get('/getwallet/:id', getwalletid);
router.put('/updatewallet/:id', updatewallet);

// --- MANAGER OPERATIONS ---
router.put('/updateonlinemg/:id', manageronline);
router.put('/updatebankmg/:id', managerbank);
router.put('/updatecashmg/:id', managercash);

export default router;