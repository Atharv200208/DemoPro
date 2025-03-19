import { useState, useEffect, use } from "react";
import {axios} from "axios";

function Dashboard(){
    const[count, setCount] = useState(0);

    useEffect(() =>{
        axios.get("http://localhost/fetch_students.php").then((response) => {
            setCount(response.data.length);
        });
    }, []);

    return(
        <div>
            <h2>Dashboard</h2>
            <p>Total Students: {count}</p>
        </div>
    );
}

export default Dashboard;
