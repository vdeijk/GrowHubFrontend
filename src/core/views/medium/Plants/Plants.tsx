import React from "react";
import styles from "./Plants.module.css";
import TableRow from "../../small/TableRow/TableRow";
import ButtonContainer from "../../small/ButtonContainer/ButtonContainer";
import plantsStore from "../../../stores/PlantsStore";

const Plants: React.FC = () => {
  const clickHandler = () => {};

  const buttonContainerData = {
    clickHandler,
    label: "Go To Plant Database",
  };

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
          {plantsStore.plants.map((plant, index) => (
            <TableRow key={index} tableRowData={{ ...plant, index }} />
          ))}
        </tbody>
      </table>
      <ButtonContainer buttonContainerData={buttonContainerData} />
    </div>
  );
};

export default Plants;
