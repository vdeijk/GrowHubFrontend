import React from "react";
import styles from "./TableRow.module.css";

interface TableRowProps {
  plant: {
    name: string;
    sunPreference: string;
    waterNeeds: string;
    soilType: string;
    soilPH: string;
    matureSize: string;
    bloomTime: string;
    fertilizerNeeds: string;
  };
  index: number; 
}

const TableRow: React.FC<TableRowProps> = ({ plant, index }) => {
  const rowClass = index % 2 === 0 ? styles.evenRow : "";

  return (
    <tr className={`${styles.tableRow} ${rowClass}`}>
      <td>{plant.name}</td>
      <td>{plant.sunPreference}</td>
      <td>{plant.waterNeeds}</td>
      <td>{plant.soilType}</td>
      <td>{plant.soilPH}</td>
      <td>{plant.matureSize}</td>
      <td>{plant.bloomTime}</td>
      <td>{plant.fertilizerNeeds}</td>
    </tr>
  );
};

export default TableRow;
