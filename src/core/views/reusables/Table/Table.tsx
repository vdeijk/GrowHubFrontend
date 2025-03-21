import React from 'react';
import styles from './Table.module.css';
import TableRow from '../TableRow/TableRow';

export interface TableProps {
  headers: { id: string; label: string }[];
  data: any[];
  onSort: (field: string) => void;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  onSort,
  sortField,
  sortOrder,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.id} onClick={() => onSort(header.id)}>
              {header.label}
              {sortField === header.id && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
            </th>
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

export default Table;
