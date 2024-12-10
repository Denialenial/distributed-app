import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventPage.css'; // Import the CSS file

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', date: '', location: '', attendees: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://distributed-app-flame.vercel.app/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://distributed-app-flame.vercel.app/api/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ name: '', description: '', date: '', location: '', attendees: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`https://distributed-app-flame.vercel.app/api/events/${id}`, {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      });
      setEvents(events.filter(event => event._id !== id)); // Remove from state
      console.log('Event deleted:', response.data);
    } catch (error) {
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://distributed-app-flame.vercel.app/api/events/${editingEvent._id}`, editingEvent);
      setEvents(events.map(event => (event._id === editingEvent._id ? response.data : event)));
      setEditingEvent(null);
      console.log('Event updated:', response.data);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const startEditing = (event) => {
    setEditingEvent(event);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  return (
    <div className="event-container">
      <h1>Event Management</h1>
      <form onSubmit={handleAdd} className="event-form">
        <input
          type="text"
          placeholder="Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Attendees"
          value={newEvent.attendees}
          onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
        />
        <button type="submit" className="add-button">Add Event</button>
      </form>

      {editingEvent && (
        <form onSubmit={handleUpdate} className="event-form">
          <h2>Edit Event</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingEvent.name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={editingEvent.description}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={editingEvent.date}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={editingEvent.location}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="attendees"
            placeholder="Attendees"
            value={editingEvent.attendees}
            onChange={handleEditChange}
          />
          <button type="submit" className="edit-button">Update Event</button>
        </form>
      )}

      <h2>Event List</h2>
      <table className="event-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.attendees}</td>
              <td>
                <button onClick={() => startEditing(event)} className="edit-button">Edit</button>
                <button onClick={() => handleRemove(event._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="footer">
        <p>© 2024 Denialcoding</p>
      </footer>
    </div>
  );
};

export default EventPage;
