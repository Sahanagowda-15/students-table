import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import { initialStudents } from "./data/students";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setStudents(initialStudents);
      setLoading(false);
    }, 1000);
  }, []);

  // ADD STUDENT
  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  // DELETE STUDENT
  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((s) => s.id !== id));

      setDeleteMsg("Student deleted successfully  ✅");

      setTimeout(() => {
        setDeleteMsg("");
      }, 3000);
    }
  };

  // EDIT STUDENT
  const startEdit = (student) => {
    setEditStudent(student);
  };

  // UPDATE STUDENT
  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s
      )
    );

    setEditStudent(null);
  };

  // SEARCH
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // DOWNLOAD EXCEL
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "students.xlsx");
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="container">

      <h2>Students Management System</h2>

      {/* DELETE MESSAGE */}
      {deleteMsg && <p style={{ color: "red" }}>{deleteMsg}</p>}

      {/* DOWNLOAD BUTTON */}
      <button className="download-btn" onClick={downloadExcel}>
        Download Excel
      </button>

      {/* SEARCH BOX */}
      <input
        className="search-box"
        type="text"
        placeholder="Search student by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editStudent={editStudent}
      />

      {/* TABLE */}
      <StudentTable
        students={filteredStudents}
        deleteStudent={deleteStudent}
        startEdit={startEdit}
      />

    </div>
  );
}

export default App;