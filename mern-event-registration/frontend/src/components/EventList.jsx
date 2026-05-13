import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = ({ onEdit }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/events';

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get(API_URL);
            setEvents(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching events:', err);
            setLoading(false);
        }
    };

    const deleteEvent = async (id) => {
        if (window.confirm('Delete this event record?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchEvents();
            } catch (err) {
                console.error('Error deleting event:', err);
            }
        }
    };

    if (loading) return <p>Loading events...</p>;

    return (
        <div className="event-list">
            <h2>Registered Events</h2>
            {events.length === 0 ? (
                <p>No events registered yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Organizer</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id}>
                                <td>{event.name}</td>
                                <td>{event.organizer}</td>
                                <td>{event.date}</td>
                                <td>{event.location}</td>
                                <td>
                                    <button onClick={() => onEdit(event)}>Edit</button>
                                    <button className="btn-delete" onClick={() => deleteEvent(event._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EventList;
