import React from 'react';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Management System</h1>
      <div className="columns">
        <div className="column">
          <img src="/images/event.jpg" alt="Event" />
        </div>
        <div className="column">
          <img src="/images/employees.jpg" alt="Employees" />         
        </div>
        <div className="column">
          <img src="/images/inventory.jpg" alt="Inventory" />
        </div>
      </div>
      <p>You can use this system to manage your inventories, employees, and events efficiently and effectively.</p>
      <footer className="footer">
        <p>© 2024 Denialcoding</p>
      </footer>
    </div>
  );
};

export default HomePage;
