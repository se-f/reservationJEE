import axios from "axios";

const BASE_URL = "http://localhost:8081";

export const fetchUserData = async (username, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData);
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, formData);
    return response.data;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};

export const updateUser = async (username, updatedUser, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${username}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const fetchAllUsers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
