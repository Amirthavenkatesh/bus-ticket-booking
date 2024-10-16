const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name: String,
    age: Number,
    startPoint: String,
    destination: String,
    fromDate: Date,
    toDate: Date,
    numPassengers: Number,
    numMale: Number,
    numFemale: Number,
    acType: String,
    seatType: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
