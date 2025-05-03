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

  const getCellColor = (
    item: T & {
      redColumns?: string[];
      yellowColumns?: string[];
      greenColumns?: string[];
    },
    headerId: string,
  ): string => {
    switch (true) {
      case item.redColumns?.includes(headerId):
        return 'var(--color-red)';
      case item.yellowColumns?.includes(headerId):
        return 'var(--color-yellow)';
      case item.greenColumns?.includes(headerId):
        return 'var(--color-primary)';
      default:
        return 'inherit';
    }
  };

  const renderCellContent = (
    headerId: keyof T,
    type?: 'date' | 'string' | 'number' | 'action',
  ) => {
    const cellValue = tableRowData[headerId];
    const cellColor = getCellColor(tableRowData, String(headerId));

    switch (type) {
      case 'action':
        return cellValue as React.ReactNode;

      case 'date':
        if (typeof cellValue === 'string') {
          return (
            <span style={{ color: cellColor }}>{formatDate(cellValue)}</span>
          );
        }
        break;

      case 'string':
      case 'number':
        return (
          <span style={{ color: cellColor }}>{String(cellValue ?? '')}</span>
        );

      default:
        return '';
    }
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
