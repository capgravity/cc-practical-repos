import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ currentEvent, onSave }) => {
    const [event, setEvent] = useState({ name: '', organizer: '', date: '', location: '', description: '' });
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/events';

    useEffect(() => {
        if (currentEvent) {
            setEvent(currentEvent);
        }
    }, [currentEvent]);

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentEvent) {
                await axios.put(`${API_URL}/${currentEvent._id}`, event);
            } else {
                await axios.post(API_URL, event);
            }
            onSave();
        } catch (err) {
            console.error('Error saving event:', err);
            alert('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="event-form">
            <h2>{currentEvent ? 'Edit Event' : 'Register New Event'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Event Name</label>
                    <input
                        type="text"
                        name="name"
                        value={event.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Organizer</label>
                    <input
                        type="text"
                        name="organizer"
                        value={event.organizer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Event Date</label>
                    <input
                        type="date"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', height: '100px', borderRadius: '6px', padding: '10px', border: '1px solid #ddd' }}
                    ></textarea>
                </div>
                <button type="submit">{currentEvent ? 'Update Event' : 'Register Event'}</button>
                <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
            </form>
        </div>
    );
};

export default EventForm;
