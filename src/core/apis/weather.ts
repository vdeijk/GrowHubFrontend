// src/services/weatherService.ts
import axios from "axios";

const API_KEY = "9176d191118d4ac68c3153418240312";
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherData = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
