import React from "react";

interface TableRowProps<T> {
  tableRowData: T;
  headers: { id: keyof T; label: string }[];
}

const TableRow = <T,>({ tableRowData, headers }: TableRowProps<T>) => {
  return (
    <tr>
      {headers.map((header, index) => (
        <td key={index}>{String(tableRowData[header.id])}</td>
      ))}
    </tr>
  );
};

export default TableRow;
