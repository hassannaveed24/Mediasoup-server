const mongoose = require('mongoose');

const note_Schema = mongoose.model('notes', new mongoose.Schema({
    ticketNum : String,
    title:String,
    note:String,
    contact:String
}));

module.exports = note_Schema;
