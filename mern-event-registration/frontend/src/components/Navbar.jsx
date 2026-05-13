import React from 'react';

const Navbar = ({ setView }) => {
    return (
        <nav className="navbar">
            <h1>Event Registration</h1>
            <div className="nav-links">
                <button onClick={() => setView('list')}>View Events</button>
                <button onClick={() => setView('add')}>Register Event</button>
            </div>
        </nav>
    );
};

export default Navbar;
