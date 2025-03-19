import { useState } from "react";
import axios from "axios";

const AddStudent = ({ onStudentAdded }) => {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        age: "",
        course: ""
    });

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api.php", student);
            
            if (response.data.success) {
                onStudentAdded(); // Refresh student list
                setStudent({ name: "", email: "", age: "", course: "" });
            } else {
                console.error("Failed to add student:", response.data.message);
            }
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <h2>Add Student</h2>
            <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" value={student.age} onChange={handleChange} required />
            <input type="text" name="course" placeholder="Course" value={student.course} onChange={handleChange} required />
            <button type="submit">Add Student</button>
        </form>
    );
};

export default AddStudent;
