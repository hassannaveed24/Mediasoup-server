const mongoose = require('mongoose');

const threshold_Schema = mongoose.model('threshold', new mongoose.Schema({
    temperatreThreshold: {
        from: {
            type: Number,
            default: 37
        },
        to: {
            type: Number,
            default: 38
        }
    },
    oxymeterThreshold: {
        from: {
            type: Number,
            default: 75
        },
        to: {
            type: Number,
            default: 100
        }
    }
},{
    capped: { size: 999999, max:1}
}))

module.exports = threshold_Schema;
