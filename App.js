import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", age: "", course: "" });
  useEffect(() => {
    axios.get("http://localhost:8000/api.php")
      .then(response => {
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          console.error("Invalid data format from API", response.data);
        }
      })
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  const addStudent = async (student) => {
    try {
      const response = await fetch("http://localhost/api/addStudent.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  
  addStudent({ name: "John Doe", age: 21 });
  


  const deleteStudent = (id) => {
    axios.delete(`http://localhost:8000/api.php?id=${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => console.error("Error deleting student:", error));
  };
  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    const student = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
    };
  
    addStudent(student);
  };
  

<form onSubmit={handleSubmit}>
  <input id="name" type="text" placeholder="Name" />
  <input id="age" type="number" placeholder="Age" />
  <button type="submit">Add Student</button>
</form>


  return (
    <div>
      <h2>Student List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length >0 ? (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>
                  <button onClick={() => deleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No students found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Add New Student</h3>
      <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
      <input type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
      <input type="number" placeholder="Age" value={newStudent.age} onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })} />
      <input type="text" placeholder="Course" value={newStudent.course} onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })} />
      <button onClick={() => addStudent({ name: "John Doe", age: 20 })}>Add Student</button> 
    </div>
  );
}

export default App;
