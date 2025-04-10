import axios from 'axios';

const BASE_URL = 'https://localhost:7075/api'; 

export const getData = async (endpoint: string, params?: Record<string, any>) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};