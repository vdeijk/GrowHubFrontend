import React from "react";
import styles from "./Plants.module.css";
import TableRow from "../../small/TableRow/TableRow";
import Button from "../../small/Button/Button";

const plantsData = [
  {
    name: "Rose",
    sunPreference: "Full Sun" as const,
    waterNeeds: "Moderate",
    soilType: "Loamy",
    soilPH: "6.0 - 7.0",
    pruning: "Spring",
    temperatureRange: "15°C - 25°C",
    plantType: "Perennial",
    growthRate: "Moderate",
    matureSize: "3-8 feet tall, 2-3 feet wide",
    bloomTime: "Spring to Fall",
    fertilizerNeeds: "Monthly during growing season",
  },
  {
    name: "Fern",
    sunPreference: "Shade" as const,
    waterNeeds: "High",
    soilType: "Rich, well-drained",
    soilPH: "5.0 - 6.5",
    pruning: "Remove dead fronds",
    temperatureRange: "18°C - 24°C",
    plantType: "Perennial",
    growthRate: "Slow to Moderate",
    matureSize: "1-3 feet tall, 1-2 feet wide",
    bloomTime: "N/A",
    fertilizerNeeds: "Monthly during growing season",
  },
];

const Plants: React.FC = () => {
  const clickHandler = () => {};
  return (
    <div className={styles.plants}>
      <h6 className={styles.h6}>Plant Information</h6>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sun Preference</th>
            <th>Water Needs</th>
            <th>Soil Type</th>
            <th>Soil PH</th>
            <th>Mature Size</th>
            <th>Bloom Time</th>
            <th>Fertilizer Needs</th>
          </tr>
        </thead>
        <tbody>
          {plantsData.map((plant, index) => (
            <TableRow key={index} plant={plant} index={index} />
          ))}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Button onClick={clickHandler}>Go To PLant Database</Button>
      </div>
    </div>
  );
};

export default Plants;
