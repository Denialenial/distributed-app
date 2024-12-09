import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/inventories';

export const fetchInventories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addInventory = async (inventory) => {
  const response = await axios.post(API_URL, inventory);
  return response.data;
};

export const updateInventory = async (id, inventory) => {
  const response = await axios.put(`${API_URL}/${id}`, inventory);
  return response.data;
};

export const deleteInventory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
