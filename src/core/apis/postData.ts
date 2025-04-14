import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://localhost:7075/api';

export const postData = async (
  endpoint: string,
  data: Record<string, unknown>,
) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);
    toast.success('Location added successfully!');
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    toast.error('Failed to post data. Please try again.');
    throw error;
  }
};
