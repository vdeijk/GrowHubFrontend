import React from 'react';
import styles from './TableWithSorting.module.css';
import TableRow from '../TableRow/TableRow';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

export interface TableProps<T extends { id?: number | undefined }> {
  headers: TableHeaderModel<T>[];
  onSort: (field: keyof T) => void;
  sortField: keyof T | null;
  sortOrder: 'asc' | 'desc';
  data: T[];
  handleEdit?: (id: number | undefined) => void;
}

const TableWithSorting = <T extends { id?: number | undefined }>({
  headers,
  data,
  onSort,
  sortField,
  sortOrder,
  handleEdit,
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
            <th
              key={String(header.id)}
              onClick={() => onSort(header.id as keyof T)}
              title={header.tooltip || ''}
            >
              <div className={styles.headerContent}>
                {header.label}
                {header.sortable !== false && (
                  <span className={styles.sortIndicator}>
                    {getSortIndicator(header.id as keyof T)}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            tableRowData={item}
            headers={headers}
            handleEdit={handleEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableWithSorting;
