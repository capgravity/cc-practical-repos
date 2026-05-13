import React from 'react';

const Navbar = ({ setView }) => {
    return (
        <nav className="navbar">
            <h1>Student Management System</h1>
            <div className="nav-links">
                <button onClick={() => setView('list')}>View Students</button>
                <button onClick={() => setView('add')}>Add Student</button>
            </div>
        </nav>
    );
};

export default Navbar;
