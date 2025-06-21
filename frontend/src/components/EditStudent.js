import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: '',
    enrollmentDate: ''
  });

  const [errors, setErrors] = useState({});

  // Fetch student data by ID
  useEffect(() => {
    axios.get(`http://localhost:8080/students/${id}`)
      .then(res => {
        const s = res.data;
        const formattedDate = s.enrollmentDate ? s.enrollmentDate.substring(0, 10) : '';
        setStudent({
          ...s,
          enrollmentDate: formattedDate
        });
      })
      .catch(err => console.error('Failed to fetch student:', err));
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!student.name.trim()) errs.name = "Name is required";
    if (!student.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(student.email)) errs.email = "Invalid email format";
    if (!student.course.trim()) errs.course = "Course is required";
    if (!student.enrollmentDate) errs.enrollmentDate = "Enrollment date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    axios.put(`http://localhost:8080/students/${id}`, student)
      .then(() => navigate("/"))
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setErrors(err.response.data); // Spring Boot validation messages
        } else {
          console.error("Update failed:", err);
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="form-control"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="form-group mb-3">
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={student.course}
            onChange={handleChange}
            className="form-control"
          />
          {errors.course && <div className="text-danger">{errors.course}</div>}
        </div>

        <div className="form-group mb-3">
          <label>Enrollment Date</label>
          <input
            type="date"
            name="enrollmentDate"
            value={student.enrollmentDate}
            onChange={handleChange}
            className="form-control"
          />
          {errors.enrollmentDate && <div className="text-danger">{errors.enrollmentDate}</div>}
        </div>

        <button type="submit" className="btn btn-info">Update</button>
      </form>
    </div>
  );
}

export default EditStudent;
