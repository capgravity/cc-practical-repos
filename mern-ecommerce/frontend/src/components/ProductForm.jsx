import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ currentProduct, onSave }) => {
    const [product, setProduct] = useState({ name: '', price: '', category: '', description: '', stock: '' });
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/products';

    useEffect(() => {
        if (currentProduct) {
            setProduct(currentProduct);
        }
    }, [currentProduct]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct) {
                await axios.put(`${API_URL}/${currentProduct._id}`, product);
            } else {
                await axios.post(API_URL, product);
            }
            onSave();
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="product-form">
            <h2>{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', height: '100px', borderRadius: '6px', padding: '10px', border: '1px solid #ddd' }}
                    ></textarea>
                </div>
                <button type="submit">{currentProduct ? 'Update Inventory' : 'Add to Inventory'}</button>
                <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
            </form>
        </div>
    );
};

export default ProductForm;
