// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bus_ticket_booking', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Ticket schema
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
    seatType: String
});

// Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema);

// Endpoint to create a new ticket
app.post('/api/tickets', async (req, res) => {
    const ticketData = req.body;
    const ticket = new Ticket(ticketData);

    try {
        const savedTicket = await ticket.save();
        res.status(201).json(savedTicket);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
