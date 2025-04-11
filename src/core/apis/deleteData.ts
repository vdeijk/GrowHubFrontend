import axios from 'axios';

const BASE_URL = 'https://localhost:7075/api';

export const deleteData = async (endpoint: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}:`, error);
    throw error;
  }
};
