import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/tasks';

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(API_URL);
            setTasks(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setLoading(false);
        }
    };

    const toggleStatus = async (task) => {
        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        try {
            await axios.put(`${API_URL}/${task._id}`, { status: newStatus });
            fetchTasks();
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm('Delete this task?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchTasks();
            } catch (err) {
                console.error('Error deleting task:', err);
            }
        }
    };

    if (loading) return <p>Loading tasks...</p>;

    return (
        <div className="task-list">
            <h2>Your Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks found. Get started!</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task._id} className={task.status === 'Completed' ? 'task-done' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={task.status === 'Completed'}
                                        onChange={() => toggleStatus(task)}
                                    />
                                </td>
                                <td>{task.title}</td>
                                <td><span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                                <td>
                                    <button onClick={() => onEdit(task)}>Edit</button>
                                    <button className="btn-delete" onClick={() => deleteTask(task._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TaskList;
