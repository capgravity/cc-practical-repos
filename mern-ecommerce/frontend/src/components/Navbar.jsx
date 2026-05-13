import React from 'react';

const Navbar = ({ setView }) => {
    return (
        <nav className="navbar">
            <h1>E-Shop Management</h1>
            <div className="nav-links">
                <button onClick={() => setView('list')}>View Inventory</button>
                <button onClick={() => setView('add')}>Add Product</button>
            </div>
        </nav>
    );
};

export default Navbar;
