const mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);

const contact_Schema = mongoose.model('contactList', new mongoose.Schema({
    name:String,
    type:{
        type:String,
        enum :["Office","Administrator","Authority","Subcontractor"]
    },
    description:String,
    phoneNumber:String,
    mobileNumber:String,
    index:{type:Number,default:1}
}).plugin(autoIncrement,{inc_field:'index'}));

module.exports = contact_Schema; 
