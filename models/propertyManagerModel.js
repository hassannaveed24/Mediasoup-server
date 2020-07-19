const mongoose = require('mongoose');

const propertyManager_Schema = mongoose.model('propertyManager', new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum: ["Property Manager","Security Manager","Employee"]
    },
    phoneNumber:String,
    
}));

module.exports = propertyManager_Schema;
