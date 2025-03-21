import React from 'react';
import styles from './TableWithSorting.module.css';
import TableRow from '../TableRow/TableRow';

export interface TableProps {
  headers: { id: string; label: string }[];
  data: any[];
  onSort: (field: string) => void;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

const TableWithSorting: React.FC<TableProps> = ({
  headers,
  data,
  onSort,
  sortField,
  sortOrder,
}) => {
  const getSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return '⇅';
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.id} onClick={() => onSort(header.id)}>
              {header.label}
              <span className={styles.sortIndicator}>
                {getSortIndicator(header.id)}
              </span>
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

export default TableWithSorting;
