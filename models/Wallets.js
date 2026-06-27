// const mongoose = require('mongoose');

// const WalletSchema = new mongoose.Schema({
//     stdid:'String',
//     studentname:'String',
//     walletid: 'String',
//     balance: 'String' ,
// });

// const WalletModel = mongoose.model('wallets' ,WalletSchema)

// module.exports = WalletModel;



import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
    stdid: { type: String, default: "" },
    studentname: { type: String, default: "" },
    walletid: { type: String, default: "" },
    balance: { type: String, default: "0" }
});

export const WalletModel = mongoose.model('wallets', WalletSchema);