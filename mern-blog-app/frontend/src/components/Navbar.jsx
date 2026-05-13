import React from 'react';

const Navbar = ({ setView }) => {
    return (
        <nav className="navbar">
            <h1>MERN Blog</h1>
            <div className="nav-links">
                <button onClick={() => setView('list')}>View Blogs</button>
                <button onClick={() => setView('add')}>Add Blog</button>
            </div>
        </nav>
    );
};

export default Navbar;
