import React from 'react';
import styles from './TableWithoutSorting.module.css';
import TableRow from '../TableRow/TableRow';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import { observer } from 'mobx-react-lite';
import Heading from '../Heading/Heading';

export interface TableProps<T> {
  headers: TableHeaderModel<T>[];
  data: T[];
}

const TableWithoutSorting = observer(
  <T extends { id?: number | null | undefined }>({
    headers,
    data,
  }: TableProps<T>) => {

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
