import React, { useEffect, useState } from 'react'
import './postManagement.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { API_ADMIN, API_ADMIN_POST, POSTS } from '../../axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import toast from 'react-hot-toast'


const PostManagement = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [reportedPosts, setReportedPosts] = useState([]);

    useEffect(() => {
        getPostsData();
    }, [])


    const columns = [
        {
            field: 'id',
            headerName: 'POST ID',
            width: 250,
        },
        {
            field: 'reason',
            headerName: 'Reason',
            width: 350,
            valueGetter: (params) => params?.row?.report?.reason
        },
        {
            field: 'view',
            headerName: 'Post',
            width: 150,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => viewPost(cellValues)}
                    >
                        View
                    </Button>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'Delete Post',
            width: 150,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => deletePost(cellValues)}
                    >
                        Delete
                    </Button>
                )
            }
        },
        {
            field: 'remove',
            headerName: 'Remove Report',
            width: 250,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => removeReport(cellValues)}
                    >
                        Remove Report
                    </Button >
                )
            }
        },
    ];

    const viewPost = async (value) => {
        navigate(`/admin/post/${value.row.id}`)
    }

    const deletePost = async (value) => {
        try {
            dispatch(showLoading());
            const res = await API_ADMIN_POST.delete(`/`, { data: { postId: value.row.id } })
            dispatch(hideLoading());
            if (res.data.status === 'success') {
                toast.success('Post has been successfully removed.');
                getPostsData();
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }

    const removeReport = async (value) => {
        try {
            dispatch(showLoading());
            const res = await API_ADMIN.patch(`${value.row.id}/report`, { reportId: value.row.report._id })
            dispatch(hideLoading());
            if (res.data.status === 'success') {
                toast.success('Report has been successfully removed.');
                getPostsData();
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }

    const getPostsData = async () => {
        try {
            dispatch(showLoading());
            const res = await API_ADMIN.get('/posts/report');
            dispatch(hideLoading());
            setReportedPosts(res.data.posts);
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }



    return (
        <div className='PostManagement'>
            <div className="container">
                <h2>Report Management</h2>
                <div className="table">
                    <Box sx={{ width: '100%' }}>
                        <DataGrid
                            rows={reportedPosts}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            autoHeight
                            getRowId={row => row.report?._id}
                        />
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default PostManagement