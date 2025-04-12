import React from 'react';
import styles from './TableWithoutSorting.module.css';
import TableRow from '../TableRow/TableRow';

export interface TableProps<T> {
  headers: { id: keyof T; label: string; sortable: boolean }[];
  data: T[];
}

const TableWithoutSorting = <T,>({ headers, data }: TableProps<T>) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={String(header.id)}>{header.label}</th>
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
