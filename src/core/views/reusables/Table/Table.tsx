import React from 'react';
import styles from './Table.module.css';
import TableRow from '../TableRow/TableRow';

interface TableProps {
  headers: string[];
  data: any[]; 
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
          {data.map((item, index) => (
            <TableRow key={index} tableRowData={{ ...item }} />
          ))}
        </tbody>
    </table>
  );
};

export default Table;