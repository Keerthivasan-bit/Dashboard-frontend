import axios from "axios";

const API_URL = "http://localhost:5000/api/items";

export const getItems = () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching items:", error);
      return []; // Return an empty array in case of error
    });
};


export const addItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};


