import React from "react";
import styles from "./TableRow.module.css";

interface TableRowProps {
  tableRowData: {
    name: string;
    sunPreference: string;
    waterNeeds: string;
    soilType: string;
    soilPH: string;
    matureSize: string;
    bloomTime: string;
    fertilizerNeeds: string;
    index: number;
  };
}

const TableRow: React.FC<TableRowProps> = ({ tableRowData }) => {
  const {
    name,
    sunPreference,
    waterNeeds,
    soilType,
    soilPH,
    matureSize,
    bloomTime,
    fertilizerNeeds,
    index,
  } = tableRowData;

  const rowClass = index % 2 === 0 ? styles.evenRow : "";

  return (
    <tr className={`${styles.tableRow} ${rowClass}`}>
      <td>{name}</td>
      <td>{sunPreference}</td>
      <td>{waterNeeds}</td>
      <td>{soilType}</td>
      <td>{soilPH}</td>
      <td>{matureSize}</td>
      <td>{bloomTime}</td>
      <td>{fertilizerNeeds}</td>
    </tr>
  );
};

export default TableRow;
