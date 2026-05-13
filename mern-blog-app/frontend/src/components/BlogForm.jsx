import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogForm = ({ currentBlog, onSave }) => {
    const [blog, setBlog] = useState({ title: '', author: '', content: '' });
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/blogs';

    useEffect(() => {
        if (currentBlog) {
            setBlog(currentBlog);
        }
    }, [currentBlog]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentBlog) {
                await axios.put(`${API_URL}/${currentBlog._id}`, blog);
            } else {
                await axios.post(API_URL, blog);
            }
            onSave();
        } catch (err) {
            console.error('Error saving blog:', err);
            alert('Error saving blog: ' + err.message);
        }
    };

    return (
        <div className="blog-form">
            <h2>{currentBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        value={blog.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">{currentBlog ? 'Update' : 'Submit'}</button>
                <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
            </form>
        </div>
    );
};

export default BlogForm;
