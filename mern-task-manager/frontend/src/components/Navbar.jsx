import React from 'react';

const Navbar = ({ setView }) => {
    return (
        <nav className="navbar">
            <h1>Task Master</h1>
            <div className="nav-links">
                <button onClick={() => setView('list')}>All Tasks</button>
                <button onClick={() => setView('add')}>New Task</button>
            </div>
        </nav>
    );
};

export default Navbar;
