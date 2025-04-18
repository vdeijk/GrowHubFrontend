import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postData = async (
  endpoint: string,
  data: Record<string, unknown>,
) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);

    toast.success('Data addded successfully!');

    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    toast.error('Failed to post data. Please try again.');
    throw error;
  }
};
