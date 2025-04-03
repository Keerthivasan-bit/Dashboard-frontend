import axios from "axios";

const API_URL = "https://dashboard-backend-henna.vercel.app/api/auth"; // Adjust based on your backend

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
