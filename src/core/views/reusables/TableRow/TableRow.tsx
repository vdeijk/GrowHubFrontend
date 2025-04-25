import React from 'react';

interface TableRowProps<T> {
  tableRowData: T;
  headers: { id: keyof T; label: string }[];
}

const TableRow = <T,>({ tableRowData, headers }: TableRowProps<T>) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const renderCellContent = (headerId: keyof T) => {
    const cellValue = tableRowData[headerId];

    if (React.isValidElement(cellValue)) {
      return cellValue as React.ReactNode;
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
