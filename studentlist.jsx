import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get("http://localhost/fetch_students.php").then((response) => {
      setStudents(response.data);
    });
  };

  const deleteStudent = (id) => {
    axios.delete("http://localhost/delete_student.php", { data: { id } }).then(() => {
      fetchStudents();
    });
  };

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add_student">Add Student</Link>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.course}
            <Link to={`/edit-student/${student.id}`}>Edit</Link>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
