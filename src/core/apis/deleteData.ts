import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const deleteData = async (endpoint: string, id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}${endpoint}`, {
      params: { id },
    });

    toast.success('Data deleted successfully!');

    return response.data;
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}:`, error);
    toast.error('Failed to delete data. Please try again.');
    throw error;
  }
};
