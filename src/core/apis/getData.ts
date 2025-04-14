import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://localhost:7075/api';

export const getData = async (
  endpoint: string,
  params?: Record<string, unknown>,
) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    toast.error('Failed to fetch data. Please try again.');
    throw error;
  }
};
