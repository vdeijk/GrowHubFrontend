import React from 'react';
import styles from './Plant.module.css';

interface PlantProps {
    plant: {
      name: string;
      sunPreference: 'Full Sun' | 'Shade';
      waterNeeds: string;
      soilType: string;
      soilPH: string;
      pruning: string;
      temperatureRange: string;
      plantType: string;
      growthRate: string;
      matureSize: string;
      bloomTime: string;
      fertilizerNeeds: string;
    };
  }
const Plant: React.FC<PlantProps> = ({ plant }) => {
  return (
    <div className={styles.plant}>
    <h3 className={styles.name}>{plant.name}</h3>
    <p><strong>Sun Preference:</strong> {plant.sunPreference}</p>
    <p><strong>Water Needs:</strong> {plant.waterNeeds}</p>
    <p><strong>Soil Type:</strong> {plant.soilType}</p>
    <p><strong>Soil pH:</strong> {plant.soilPH}</p>
    <p><strong>Pruning:</strong> {plant.pruning}</p>
    <p><strong>Temperature Range:</strong> {plant.temperatureRange}</p>
    <p><strong>Plant Type:</strong> {plant.plantType}</p>
    <p><strong>Growth Rate:</strong> {plant.growthRate}</p>
    <p><strong>Mature Size:</strong> {plant.matureSize}</p>
    <p><strong>Bloom Time:</strong> {plant.bloomTime}</p>
    <p><strong>Fertilizer Needs:</strong> {plant.fertilizerNeeds}</p>
  </div>
  );
};

export default Plant;