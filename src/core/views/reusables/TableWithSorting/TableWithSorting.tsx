import React from 'react';
import styles from './TableWithSorting.module.css';
import TableRow from '../TableRow/TableRow';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import Heading from '../Heading/Heading';
import { observer } from 'mobx-react-lite';

export interface TableProps<T> {
  headers: TableHeaderModel<T>[];
  data: T[];
  onSort?: (field: keyof T) => void;
  sortField?: keyof T | null;
  sortOrder?: 'asc' | 'desc';
  handleEdit?: (id: number | undefined) => void;
}

const TableWithSorting = observer(
  <T extends { id?: number | null | undefined }>({
    headers,
    data,
    onSort,
    sortField,
    sortOrder,
    handleEdit,
  }: TableProps<T>) => {
    const getSortIndicator = (field: keyof T) => {
      if (!onSort) {
        return '';
      }

      if (sortField === field) {
        return sortOrder === 'asc' ? '▲' : '▼';
      }
      return '⇅';
    };

    if (data.length === 0) {
      return (
        <div className={styles.emptyState}>
          <Heading level={5} text={'No data available'} />
        </div>
      );
    }

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={String(header.id)}
                onClick={() =>
                  onSort &&
                  header.sortable !== false &&
                  onSort(header.id as keyof T)
                }
                title={header.tooltip || ''}
              >
                <div className={styles.headerContent}>
                  {header.label}
                  {onSort && header.sortable !== false && (
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
              tableRowData={{ ...item, id: item.id ?? undefined }}
              headers={headers}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    );
  },
);

export default TableWithSorting;
