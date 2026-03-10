import React from "react";

function StudentTable({ students, deleteStudent, startEdit }) {
  return (
    <table border="1" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.age}</td>
            <td>
            <button className="edit-btn" onClick={()=>startEdit(s)}>Edit</button>

            <button className="delete-btn" onClick={()=>deleteStudent(s.id)}>
Delete
</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;