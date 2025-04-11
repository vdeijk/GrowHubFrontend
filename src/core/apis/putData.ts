import axios from 'axios';

const BASE_URL = 'https://localhost:7075/api';

export const putData = async (endpoint: string, data: Record<string, any>) => {
  try {
    const response = await axios.put(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    throw error;
  }
};
