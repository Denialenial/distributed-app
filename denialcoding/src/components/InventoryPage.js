import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryPage.css'; // Import the CSS file

const InventoryPage = () => {
  const [inventories, setInventories] = useState([]);
  const [newInventory, setNewInventory] = useState({ name: '', quantity: '', price: '' });
  const [editingInventory, setEditingInventory] = useState(null);

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    try {
      const response = await axios.get('https://distributed-app-flame.vercel.app/api/inventories');
      setInventories(response.data);
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://distributed-app-flame.vercel.app/api/inventories', newInventory);
      setInventories([...inventories, response.data]);
      setNewInventory({ name: '', quantity: '', price: '' });
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`https://distributed-app-flame.vercel.app/api/inventories/${id}`, {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      });
      setInventories(inventories.filter(inventory => inventory._id !== id)); // Remove from state
      console.log('Inventory deleted:', response.data);
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
      const response = await axios.put(`https://distributed-app-flame.vercel.app/api/inventories/${editingInventory._id}`, editingInventory);
      setInventories(inventories.map(inventory => (inventory._id === editingInventory._id ? response.data : inventory)));
      setEditingInventory(null);
      console.log('Inventory updated:', response.data);
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  const startEditing = (inventory) => {
    setEditingInventory(inventory);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingInventory({ ...editingInventory, [name]: value });
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>
      <form onSubmit={handleAdd} className="inventory-form">
        <input
          type="text"
          placeholder="Name"
          value={newInventory.name}
          onChange={(e) => setNewInventory({ ...newInventory, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newInventory.quantity}
          onChange={(e) => setNewInventory({ ...newInventory, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newInventory.price}
          onChange={(e) => setNewInventory({ ...newInventory, price: e.target.value })}
        />
        <button type="submit" className="add-button">Add Inventory</button>
      </form>

      {editingInventory && (
        <form onSubmit={handleUpdate} className="inventory-form">
          <h2>Edit Inventory</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingInventory.name}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={editingInventory.quantity}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={editingInventory.price}
            onChange={handleEditChange}
          />
          <button type="submit" className="edit-button">Update Inventory</button>
        </form>
      )}

      <h2>Inventory List</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map(inventory => (
            <tr key={inventory._id}>
              <td>{inventory.name}</td>
              <td>{inventory.quantity}</td>
              <td>${inventory.price}</td>
              <td>
                <button onClick={() => startEditing(inventory)} className="edit-button">Edit</button>
                <button onClick={() => handleRemove(inventory._id)} className="delete-button">Delete</button>
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

export default InventoryPage;
