import axios from 'axios';
import { Plant } from '../../auxiliary/interfaces/Plant';
import { PlantApiResponse } from '../../auxiliary/interfaces/PlantApiReponse';

const API_KEY = import.meta.env.VITE_PLANT_API_KEY;
const BASE_URL = `https://perenual.com/api/v2/species-list?key=${API_KEY}&page=1`;

export const getPlantData = async (): Promise<Plant[]> => {
  try {
    const response = await axios.get(BASE_URL);

    const transformedData: Plant[] = response.data.data.map(
      (plant: PlantApiResponse) => ({
        commonName: plant.common_name || 'Unknown',
        genus: plant.genus || 'Unknown',
        id: plant.id,
        defaultImage: null,
        scientificName: plant.scientific_name || 'Unknown',
      }),
    );

    return transformedData;
  } catch (error) {
    console.error('Error fetching plant data:', error);
    throw error;
  }
};
