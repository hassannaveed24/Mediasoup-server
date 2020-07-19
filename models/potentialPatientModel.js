const mongoose = require('mongoose');

const potentialPatient_Schema = mongoose.model('potentialPatient', new mongoose.Schema({
    // location:{        
    //     x: String,
    //     y: String
    // },
    // entranceName: String,
    // timeStamp: {
    //     type: String,
    //     default: new Date()
    // },
    // temperatureReading: Number,
    // oxymeterReading: Number,
    imageURL: String,
    floor: String,
    location:{
        top: String,
        right: String
    },
    timestamp:{
        type: Date,
        default: new Date
    },
    locationName: String,
    readings:{
        thermometer: String,
        oxymeter: String
    }


}));

module.exports = potentialPatient_Schema;
