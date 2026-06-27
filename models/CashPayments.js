// const mongoose = require('mongoose');

// const CashSchema = new mongoose.Schema({
//     itnumber:'String',
//     studentname:'String',
//     description: 'String',
//     date: 'String',
//     amount: 'String',
//     status : 'String',
//     type : 'String',
// });

// const CashModel = mongoose.model('cashpayments' ,CashSchema)

// module.exports = CashModel;


import mongoose from "mongoose";

const CashSchema = new mongoose.Schema({
    itnumber: { type: String, default: "" },
    studentname: { type: String, default: "" },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    amount: { type: String, default: "" },
    status: { type: String, default: "" },
    type: { type: String, default: "" }
});

export const CashModel = mongoose.model('cashpayments', CashSchema);