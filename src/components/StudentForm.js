import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editStudent }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editStudent) {
      setStudent(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.email || !student.age) {
      alert("All fields are required");
      return;
    }

    if (!validateEmail(student.email)) {
      alert("Invalid email format");
      return;
    }

    if (editStudent) {
      updateStudent(student);
      setMessage("Student updated successfully ✅");
    } else {
      addStudent(student);
      setMessage("Student added successfully ✅");
    }

    setStudent({
      name: "",
      email: "",
      age: ""
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          value={student.age}
          onChange={handleChange}
        />


        <button className="add-btn" type="submit">
            {editStudent ? "Update Student" : "Add Student"}
        </button>

      </form>
    </div>
  );
}

export default StudentForm;