import React from 'react';
import styles from './TableWithoutSorting.module.css';
import TableRow from '../TableRow/TableRow';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import { observer } from 'mobx-react-lite';

export interface TableProps<T> {
  headers: TableHeaderModel<T>[];
  data: T[];
}

const TableWithoutSorting = observer(
  <T extends { id?: number | null | undefined }>({
    headers,
    data,
  }: TableProps<T>) => {
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
            <TableRow
              key={index}
              tableRowData={{ ...item, id: item.id ?? undefined }}
              headers={headers}
            />
          ))}
        </tbody>
      </table>
    );
  },
);

export default TableWithoutSorting;
