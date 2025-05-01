import React from 'react';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

interface TableRowProps<T> {
  tableRowData: T;
  headers: TableHeaderModel<T>[];
}

const TableRow = <T,>({ tableRowData, headers }: TableRowProps<T>) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const renderCellContent = (
    headerId: keyof T,
    type?: 'date' | 'string' | 'number' | 'action',
  ) => {
    const cellValue = tableRowData[headerId];

    if (type === 'action') {
      return cellValue as React.ReactNode;
    }

    if (cellValue === null || cellValue === undefined) {
      return '';
    }

    if (type === 'date' && typeof cellValue === 'string') {
      return formatDate(cellValue);
    }

    return String(cellValue ?? '');
  };

  return (
    <tr>
      {headers.map((header) => (
        <td key={String(header.id)}>
          {renderCellContent(header.id as keyof T, header.type)}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
