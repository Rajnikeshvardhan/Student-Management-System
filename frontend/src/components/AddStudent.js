import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [student, setStudent] = useState({ name: '', email: '', course: '', enrollmentDate: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!student.name.trim()) errs.name = "Name is required";
    if (!student.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(student.email)) errs.email = "Email is invalid";
    if (!student.course.trim()) errs.course = "Course is required";
    if (!student.enrollmentDate) errs.enrollmentDate = "Enrollment Date is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    axios.post('http://localhost:8080/students', student)
      .then(() => navigate('/'))
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setErrors(err.response.data);
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={student.name}
          onChange={e => setStudent({ ...student, name: e.target.value })}
        />
        {errors.name && <div className="text-danger mb-2">{errors.name}</div>}

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={student.email}
          onChange={e => setStudent({ ...student, email: e.target.value })}
        />
        {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

        <input
          className="form-control mb-2"
          placeholder="Course"
          value={student.course}
          onChange={e => setStudent({ ...student, course: e.target.value })}
        />
        {errors.course && <div className="text-danger mb-2">{errors.course}</div>}

        <input
          type="date"
          className="form-control mb-2"
          value={student.enrollmentDate}
          onChange={e => setStudent({ ...student, enrollmentDate: e.target.value })}
        />
        {errors.enrollmentDate && <div className="text-danger mb-2">{errors.enrollmentDate}</div>}

        <button className="btn btn-success m-2" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddStudent;
