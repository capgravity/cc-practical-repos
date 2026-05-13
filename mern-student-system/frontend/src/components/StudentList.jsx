import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = ({ onEdit }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/students';

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get(API_URL);
            setStudents(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching students:', err);
            setLoading(false);
        }
    };

    const deleteStudent = async (id) => {
        if (window.confirm('Delete this record?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchStudents();
            } catch (err) {
                console.error('Error deleting student:', err);
            }
        }
    };

    if (loading) return <p>Loading records...</p>;

    return (
        <div className="student-list">
            <h2>Student Records</h2>
            {students.length === 0 ? (
                <p>No records found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td>{student.rollNumber}</td>
                                <td>{student.name}</td>
                                <td>{student.department}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button onClick={() => onEdit(student)}>Edit</button>
                                    <button className="btn-delete" onClick={() => deleteStudent(student._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentList;
