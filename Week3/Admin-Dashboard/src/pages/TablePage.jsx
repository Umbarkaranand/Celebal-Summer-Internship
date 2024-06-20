import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 110 },
];

const rows = [
  { id: 1, name: 'John Doe', age: 35 },
  { id: 2, name: 'Jane Smith', age: 42 },
];

function TablePage() {
  return (
    <div>
      <h1>Tables</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
}

export default TablePage;
