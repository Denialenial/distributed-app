import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/events';

export const fetchEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addEvent = async (event) => {
  const response = await axios.post(API_URL, event);
  return response.data;
};

export const updateEvent = async (id, event) => {
  const response = await axios.put(`${API_URL}/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
