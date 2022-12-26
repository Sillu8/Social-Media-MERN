import React, { useEffect, useState } from 'react'
import './userManagement.scss'
import { DataGrid } from '@mui/x-data-grid';
import { API_ADMIN } from '../../axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import { Button } from '@mui/material';



const UserManagement = () => {
  
  
  const dispatch = useDispatch();
  
    useEffect(() => {
      getUsersData();
    }, [])
  
    const [usersData, setUsersData] = useState([]);

    
    const getUsersData = async () => {
    try {
      dispatch(showLoading())
      const res = await API_ADMIN.get('/users');
      dispatch(hideLoading());
      setUsersData(res.data.data.users);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };


  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 200,
    },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phone', headerName: 'Phone', width: 250 },
    {
      field: 'isBlocked',
      headerName: 'Blocked',
      width: 250,
      renderCell: (cellValues) => {
        return (
          <Button
          variant='contained'
          color='primary'
          onClick={event => {
            handleClick(event, cellValues);
          }}
          >
            {`${cellValues.row.isBlocked}`}
          </Button>
        )
      }
    },
  ];
  
  const handleClick = async (e,value) => {
    try {
      console.log(value);
      dispatch(showLoading())
      const res = await API_ADMIN.patch(`/${value.id}/block`, {isBlocked : value.row.isBlocked});
      dispatch(hideLoading());
      getUsersData();
    } catch (error) {
      console.log(error);
    }
  }
  
  

  return (
    <div className='userManagement'>
      <div className="container">
        <h2>User Management</h2>
        <div className="table" >
          <div style={{ height: 415, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DataGrid
              rows={usersData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagement