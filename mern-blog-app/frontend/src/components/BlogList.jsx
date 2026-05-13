import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = ({ onEdit }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/blogs';

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(API_URL);
            setBlogs(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchBlogs();
            } catch (err) {
                console.error('Error deleting blog:', err);
            }
        }
    };

    if (loading) return <p>Loading blogs...</p>;

    return (
        <div className="blog-list">
            <h2>All Blogs</h2>
            {blogs.length === 0 ? (
                <p>No blogs found. Add one!</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <td>
                                    <button onClick={() => onEdit(blog)}>Edit</button>
                                    <button className="btn-delete" onClick={() => deleteBlog(blog._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BlogList;
