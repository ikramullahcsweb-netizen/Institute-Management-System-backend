// const mongoose = require('mongoose');

// const BankSchema = new mongoose.Schema({
//     itnumber:'String',
//     accountname:'String',
//     accountnumber: 'Number',
//     bankname: 'String',
//     description: 'String',
//     date: 'String',
//     amount: 'String',
//     status : 'String',
//     type : 'String',
//     upload_files: 'String',

// });

// const BankModel = mongoose.model('bankpayments' ,BankSchema)

// module.exports = BankModel;



import mongoose from "mongoose";

const BankSchema = new mongoose.Schema({
    itnumber: { type: String, default: "" },
    accountname: { type: String, default: "" },
    accountnumber: { type: String, default: "" },
    bankname: { type: String, default: "" },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    amount: { type: String, default: "" },
    status: { type: String, default: "" },
    type: { type: String, default: "" },
    upload_files: { type: String, default: "" }
});
export const BankModel = mongoose.model('bankpayments', BankSchema);