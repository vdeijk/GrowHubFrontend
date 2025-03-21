import React from 'react';

interface TableRowProps {
  tableRowData: Record<string, string | number | boolean | null | undefined>;
  headers: { id: string; label: string }[];
}

const TableRow: React.FC<TableRowProps> = ({ tableRowData, headers }) => {
  return (
    <tr>
      {headers.map((header, index) => (
        <td key={index}>{tableRowData[header.id]}</td>
      ))}
    </tr>
  );
};

export default TableRow;
