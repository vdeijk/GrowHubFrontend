import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: import.meta.env.VITE_WEATHER_API_KEY,
        q: city,
      },
    });
    
    return response.data;
  } catch (error) {
    toast.error('Error fetching weather data');
    throw error;
  }
};
