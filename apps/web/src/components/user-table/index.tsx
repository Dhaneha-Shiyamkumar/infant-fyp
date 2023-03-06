import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useUsers } from '../../hooks/users/useUsers';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

export default function UserDataTable() {
  const users = useUsers();
  const navigate = useNavigate();

  return (
    <div style={{ height: 400, width: '100%' }}>
      {users.isLoading && (
        <>
          {' '}
          <CircularProgress />
        </>
      )}

      {users.isSuccess && (
        <DataGrid
          rows={users.data}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          onPaginationModelChange={(data) => {
            console.log(data);
          }}
          onCellClick={(data) => {
            navigate(`/dashboard/user/${data.id}`);
          }}
          pageSizeOptions={[5, 20, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </div>
  );
}
