import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/products';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(API_URL);
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm('Delete this product from inventory?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
            }
        }
    };

    if (loading) return <p>Loading inventory...</p>;

    return (
        <div className="product-list">
            <h2>Current Inventory</h2>
            {products.length === 0 ? (
                <p>No products found in database.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button onClick={() => onEdit(product)}>Edit</button>
                                    <button className="btn-delete" onClick={() => deleteProduct(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
