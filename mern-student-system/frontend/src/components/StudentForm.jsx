import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ currentStudent, onSave }) => {
    const [student, setStudent] = useState({ name: '', rollNumber: '', department: '', email: '' });
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/students';

    useEffect(() => {
        if (currentStudent) {
            setStudent(currentStudent);
        }
    }, [currentStudent]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentStudent) {
                await axios.put(`${API_URL}/${currentStudent._id}`, student);
            } else {
                await axios.post(API_URL, student);
            }
            onSave();
        } catch (err) {
            console.error('Error saving student:', err);
            alert('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="student-form">
            <h2>{currentStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Roll Number</label>
                    <input
                        type="text"
                        name="rollNumber"
                        value={student.rollNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input
                        type="text"
                        name="department"
                        value={student.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{currentStudent ? 'Update' : 'Submit'}</button>
                <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
            </form>
        </div>
    );
};

export default StudentForm;
