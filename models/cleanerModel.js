const mongoose = require('mongoose');

const cleaner_Schema = mongoose.model('cleaningSecurity', new mongoose.Schema({
    fullName:String,
    email:String,
    role:{
        type:String,
        enum: ["Cleaning Team","Security Team"]
    },
    phoneNumber:String,
}));

module.exports = cleaner_Schema;
