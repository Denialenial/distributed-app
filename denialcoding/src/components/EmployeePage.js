import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeePage.css'; // Import the CSS file

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', department: '', salary: '' });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://distributed-app-flame.vercel.app/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://distributed-app-flame.vercel.app/api/employees', newEmployee);
      setEmployees([...employees, response.data]);
      setNewEmployee({ name: '', position: '', department: '', salary: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`https://distributed-app-flame.vercel.app/api/employees/${id}`, {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      });
      setEmployees(employees.filter(employee => employee._id !== id)); // Remove from state
      console.log('Employee deleted:', response.data);
    } catch (error) {
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://distributed-app-flame.vercel.app/api/employees/${editingEmployee._id}`, editingEmployee);
      setEmployees(employees.map(employee => (employee._id === editingEmployee._id ? response.data : employee)));
      setEditingEmployee(null);
      console.log('Employee updated:', response.data);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const startEditing = (employee) => {
    setEditingEmployee(employee);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee({ ...editingEmployee, [name]: value });
  };

  return (
    <div className="employee-container">
      <h1>Employee Management</h1>
      <form onSubmit={handleAdd} className="employee-form">
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={newEmployee.department}
          onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
        />
        <input
          type="number"
          placeholder="Salary"
          value={newEmployee.salary}
          onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
        />
        <button type="submit" className="add-button">Add Employee</button>
      </form>

      {editingEmployee && (
        <form onSubmit={handleUpdate} className="employee-form">
          <h2>Edit Employee</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingEmployee.name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={editingEmployee.position}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={editingEmployee.department}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={editingEmployee.salary}
            onChange={handleEditChange}
          />
          <button type="submit" className="edit-button">Update Employee</button>
        </form>
      )}

      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>${employee.salary}</td>
              <td>
                <button onClick={() => startEditing(employee)} className="edit-button">Edit</button>
                <button onClick={() => handleRemove(employee._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="footer">
        <p>© 2024 Denialcoding</p>
      </footer>
    </div>
  );
};

export default EmployeePage;
