import React from 'react';
import styles from './TableWithoutSorting.module.css';
import TableRow from '../TableRow/TableRow';

export interface TableProps {
  headers: { id: string; label: string }[];
  data: any[];
}

const TableWithoutSorting: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.id}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} tableRowData={{ ...item }} headers={headers} />
        ))}
      </tbody>
    </table>
  );
};

export default TableWithoutSorting;
