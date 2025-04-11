import React from 'react';
import styles from './TableWithSorting.module.css';
import TableRow from '../TableRow/TableRow';

export interface TableProps<T> {
  headers: { id: keyof T; label: string }[];
  onSort: (field: keyof T) => void;
  sortField: keyof T | null;
  sortOrder: 'asc' | 'desc';
  data: T[];
}

const TableWithSorting = <T,>({
  headers,
  data,
  onSort,
  sortField,
  sortOrder,
}: TableProps<T>) => {
  const getSortIndicator = (field: keyof T) => {
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
            <th key={String(header.id)} onClick={() => onSort(header.id)}>
              {header.label}
              {header.sortable !== false && (
                <span className={styles.sortIndicator}>
                  {getSortIndicator(header.id)}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} tableRowData={item} headers={headers} />
        ))}
      </tbody>
    </table>
  );
};

export default TableWithSorting;
