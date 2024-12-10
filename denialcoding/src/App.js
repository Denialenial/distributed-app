import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InventoryPage from './components/InventoryPage';
import EmployeePage from './components/EmployeePage';
import EventPage from './components/EventPage';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/inventories">Inventories</Link>
            </li>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventories" element={<InventoryPage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/events" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
