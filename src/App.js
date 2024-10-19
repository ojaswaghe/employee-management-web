// File: src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get('http://15.206.187.100:5000/api/employees');
        setEmployees(response.data);
    };

    const addEmployee = async () => {
        await axios.post('http://15.206.187.100:5000/api/employees', { name, position, salary });
        fetchEmployees();
    };

    const deleteEmployee = async (id) => {
        await axios.delete(`http://15.206.187.100:5000/api/employees/${id}`);
        fetchEmployees();
    };

    return (
        <div className="App">
            <h1>Employee Management</h1>
            <div>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
                <input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                <button onClick={addEmployee}>Add Employee</button>
            </div>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name} - {employee.position} - ${employee.salary}
                        <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
