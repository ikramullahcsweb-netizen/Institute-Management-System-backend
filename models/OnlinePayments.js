// const mongoose = require('mongoose');

// const OnlineSchema = new mongoose.Schema({
//     itnumber:'String',
//     // cardname:'String',
//     // cardnumber: 'Number',
//     // securitycode: 'Number',
//     // expiredate: 'String',    
//     description: 'String',
//     date: 'String',
//     amount: 'String',
//     status : 'String',
//     type : 'String',
// });

// const OnlineModel = mongoose.model('OnlinePayments' ,OnlineSchema)

// module.exports = OnlineModel;




import mongoose from "mongoose";
const OnlineSchema = new mongoose.Schema({
    itnumber: { type: String, default: "" },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    amount: { type: String, default: "" },
    status: { type: String, default: "" },
    type: { type: String, default: "" }
});

export const OnlineModel = mongoose.model('OnlinePayments', OnlineSchema);