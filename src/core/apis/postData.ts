import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://localhost:7075/api';

export const postData = async (endpoint: string, data: Record<string, any>) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    toast.error('Failed to post data. Please try again.');
    throw error;
  }
};
