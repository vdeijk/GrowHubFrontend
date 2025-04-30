import React from 'react';

interface TableRowProps<T> {
  tableRowData: T;
  headers: { id: keyof T; label: string }[];
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

  const renderCellContent = (headerId: keyof T) => {
    const cellValue = tableRowData[headerId];

    if (React.isValidElement(cellValue)) {
      return cellValue as React.ReactNode;
    }

    if (cellValue === null || cellValue === undefined) {
      return '';
    }

    if (headerId === 'dueDate' && typeof cellValue === 'string') {
      return formatDate(cellValue);
    }
    return String(cellValue ?? '');
  };

  return (
    <tr>
      {headers.map((header) => (
        <td key={String(header.id)}>{renderCellContent(header.id)}</td>
      ))}
    </tr>
  );
};

export default TableRow;
