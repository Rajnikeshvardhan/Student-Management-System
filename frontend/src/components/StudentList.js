import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);
  

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:8080/students/${id}`)
      .then(() => setStudents(students.filter(s => s.id !== id)));
  };

  return (
    <div className="container mt-5">
      <h2>Student List</h2>
      <Link to="/add" className="btn btn-success mb-3">Add Student</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Enrollment Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{new Date(s.enrollmentDate).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit/${s.id}`} className="btn btn-secondary btn-sm mx-1">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
