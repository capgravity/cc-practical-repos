import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ currentTask, onSave }) => {
    const [task, setTask] = useState({ title: '', description: '', priority: 'Medium', status: 'Pending' });
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/tasks';

    useEffect(() => {
        if (currentTask) {
            setTask(currentTask);
        }
    }, [currentTask]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentTask) {
                await axios.put(`${API_URL}/${currentTask._id}`, task);
            } else {
                await axios.post(API_URL, task);
            }
            onSave();
        } catch (err) {
            console.error('Error saving task:', err);
            alert('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="task-form">
            <h2>{currentTask ? 'Edit Task' : 'Create New Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <select name="priority" value={task.priority} onChange={handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', height: '100px', borderRadius: '6px', padding: '10px', border: '1px solid #ddd' }}
                    ></textarea>
                </div>
                <button type="submit">{currentTask ? 'Update Task' : 'Save Task'}</button>
                <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
            </form>
        </div>
    );
};

export default TaskForm;
