import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/BusTicketBooking.css'; 
import busback from './assets/busback.png'; 
import TicketGraph from './TicketGraph'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faMale, faFemale, faCalendarAlt, faMapMarkerAlt, faChair } from '@fortawesome/free-solid-svg-icons';

function BusTicketBooking() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [numPassengers, setNumPassengers] = useState('');
  const [numMale, setNumMale] = useState('');
  const [numFemale, setNumFemale] = useState('');
  const [acType, setAcType] = useState('');
  const [seatType, setSeatType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState([]);

  const placesInTN = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(numMale) + parseInt(numFemale) !== parseInt(numPassengers)) {
      setError("Total male and female passengers must equal the total number of passengers.");
    } else {
      setError('');
      setSubmitted(true);

      const ticketData = {
        name,
        age,
        startPoint,
        destination,
        fromDate,
        toDate,
        numPassengers,
        numMale,
        numFemale,
        acType,
        seatType
      };

      try {
        const response = await axios.post('http://localhost:5000/api/tickets', ticketData);
        console.log("Ticket booked successfully:", response.data);
        setData(prevData => [...prevData, response.data]);

      } catch (error) {
        console.error("Error booking ticket:", error);
        setError('Failed to book the ticket. Please try again.');
      }
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${busback})` }}>
      <h1>Bus Ticket Booking</h1>

      {/* Scrollable form container */}
      <div className="form-container">
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name: </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Age: </label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required min="1" />
            </div>
            <div className="input-group">
              <label>Starting Point: </label>
              <select value={startPoint} onChange={(e) => setStartPoint(e.target.value)} required>
                <option value="" disabled>Select your starting point</option>
                {placesInTN.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Destination: </label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
                <option value="" disabled>Select your destination</option>
                {placesInTN.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>From Date: </label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>To Date: </label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Number of Passengers: </label>
              <input type="number" value={numPassengers} onChange={(e) => setNumPassengers(e.target.value)} required min="1" />
            </div>
            <div className="input-group">
              <label>Number of Males: </label>
              <input type="number" value={numMale} onChange={(e) => setNumMale(e.target.value)} required min="0" />
            </div>
            <div className="input-group">
              <label>Number of Females: </label>
              <input type="number" value={numFemale} onChange={(e) => setNumFemale(e.target.value)} required min="0" />
            </div>
            <div className="input-group">
              <label>AC Type: </label>
              <select value={acType} onChange={(e) => setAcType(e.target.value)} required>
                <option value="" disabled>Select AC or Non-AC</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>
            <div className="input-group">
              <label>Seat Type: </label>
              <select value={seatType} onChange={(e) => setSeatType(e.target.value)} required>
                <option value="" disabled>Select Seater or Sleeper</option>
                <option value="Seater">Seater</option>
                <option value="Sleeper">Sleeper</option>
              </select>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="submit-btn">Book Ticket</button>
          </form>
        ) : (
          <div className="ticket-details">
            <h2>Ticket Details</h2>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Starting Point: {startPoint}</p>
            <p>Destination: {destination}</p>
            <p>From Date: {fromDate}</p>
            <p>To Date: {toDate}</p>
            <p>Number of Passengers: {numPassengers}</p>
            <p>Number of Males: {numMale}</p>
            <p>Number of Females: {numFemale}</p>
            <p>AC Type: {acType}</p>
            <p>Seat Type: {seatType}</p>
            <button onClick={() => setSubmitted(false)} className="submit-btn">Book Another Ticket</button>
          </div>
        )}
      </div>

      {/* Render the TicketGraph with the fetched data */}
      <div className="graph-container">
        <TicketGraph data={data} />
      </div>
    </div>
  );
}

export default BusTicketBooking;
