import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://localhost:7075/api';

export const deleteData = async (endpoint: string, id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}${endpoint}`, { params: { id } });

    toast.success('Data deleted successfully!');

    return response.data;
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}:`, error);
    toast.error('Failed to delete data. Please try again.');
    throw error;
  }
};
