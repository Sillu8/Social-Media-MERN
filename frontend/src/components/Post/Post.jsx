import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './Post.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import Comments from '../Comments/Comments';
import toast from 'react-hot-toast';
import moment from "moment";
import { POSTS } from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from '../../redux/auth/userSlice';
import { useForm } from 'react-hook-form';
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Post = ({ data, id }) => {



    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userData);


    const [post, setPost] = useState(data);
    const [removePost, setRemovePost] = useState(false)


    useEffect(() => {
        setPost(data);
    }, [data])


    //Edit Modal States
    const [desc, setDesc] = useState(post?.desc);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleEditModalClose = () => setEditModalOpen(false);

    const handleEditSubmit = async () => {
        try {
            handleEditModalClose();
            dispatch(showLoading());
            const res = await POSTS.patch(`/${post?._id}/edit`, { desc });
            dispatch(hideLoading());
            setPost(res.data.post);
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error(error.response.data.message)
        }
    }


    //Report Modal states
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);


    //Report post
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            handleModalClose();
            dispatch(showLoading());
            const formData = { ...data, reportedUserId: user?._id };
            const res = await POSTS.patch(`/${post?._id}/report`, formData)
            dispatch(hideLoading())
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setRemovePost(true);
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('some unknown error')
            console.log(error);
        }
    };





    //Delete dialog states
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => setDialogOpen(true)
    const handleDialogClose = () => setDialogOpen(false);

    //Delete Post
    const deletePost = async () => {
        try {
            handleDialogClose();
            dispatch(showLoading());
            const res = await POSTS.delete('/', { data: { postId: post?._id } });
            dispatch(hideLoading());
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setRemovePost(true);
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('some unknown error')
            console.log(error);
        }
    }





    const [showComments, setShowComments] = useState(false);
    const [isMyPost, setIsMyPost] = useState(user?._id === post?.userID);

    //Post buttons toggle
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;

    let likeCount = post?.likes?.length;
    let commentCount = post?.comments?.length;


    //Like Post
    const like = async () => {
        try {
            const response = await POSTS.patch(`/${post._id}/like`);
            setPost(response.data.post);
        } catch (error) {
            toast.error('Some unknown error!')
        }
    }

    //Dislike Post
    const dislike = async () => {
        try {
            const response = await POSTS.patch(`/${post._id}/unlike`);
            setPost(response.data.post);
        } catch (error) {
            toast.error('Some unknown error!')
        }
    }


    //Save and unsave post
    const save = async () => {
        try {
            await POSTS.patch(`/${post._id}/save`);
            dispatch(fetchUserData(localStorage.getItem('token')));
        } catch (error) {
            toast.error('Some unknown error!')
        }
    }


    const postComments = async () => {
        try {
            setShowComments(!showComments);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    return (
        <div className={removePost ? 'post d-none' : 'post'} key={data._id}>
            <div className="container">
                <div className="user">
                    <Link to={`/profile/${post?.userName}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="user-info">
                            <Avatar src={post?.userProfilePic} sx={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                            <div className="details">
                                <span className='name'>{post?.userName}</span>
                                <span className='date'>{moment(post?.createdAt).fromNow()}</span>
                            </div>
                        </div>
                    </Link>
                    {/* Icon for buttons */}
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {
                            isMyPost &&
                            <MenuItem onClick={() => {
                                handleClose();
                                handleEditModalOpen();
                            }}>
                                Edit
                            </MenuItem>

                        }
                        {
                            isMyPost &&
                            <MenuItem onClick={() => {
                                handleClose();
                                handleDialogOpen();
                            }}>
                                Delete
                            </MenuItem>

                        }
                        {
                            !isMyPost &&
                            <MenuItem onClick={() => {
                                handleClose();
                                handleModalOpen()
                            }}>
                                Report
                            </MenuItem>
                        }
                    </Menu>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon sx={{ cursor: 'pointer' }} />
                    </IconButton>


                    {/* Edit Modal */}
                    <Modal
                        open={editModalOpen}
                        onClose={handleEditModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                                EDIT
                            </Typography>

                            <TextField size='small' sx={{ marginBottom: '20px', color: 'white', }} fullWidth label='Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
                            <Button sx={{ marginTop: '20px' }} variant='contained' type='submit' onClick={handleEditSubmit}>SUBMIT</Button>
                        </Box>
                    </Modal>




                    {/* Delete Dialog */}
                    <Dialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" align='center'>
                            Delete Post?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this post?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose}>No</Button>
                            <Button onClick={() => { handleDialogClose(); deletePost(); }} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>



                    {/* Report Modal */}
                    <Modal
                        open={modalOpen}
                        onClose={handleModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                                REPORT
                            </Typography>
                            <Typography variant='body1' sx={{ textAlign: 'center', marginBottom: '20px', color: 'red' }}>{errors?.reason?.message}</Typography>

                            <form onSubmit={handleSubmit(onSubmit)}>


                                <div className="radio" style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '20px' }}>
                                    <div className="radio-option" style={{ display: 'flex', gap: '9px' }}>
                                        <input {...register("reason", { required: "Please select any one option!" })} id='impersonation' type="radio" value="Impersonating you or someone else you know." />
                                        <label htmlFor="impersonation">Impersonating you or someone else you know.</label><br />
                                    </div>

                                    <div className="radio-option" style={{ display: 'flex', gap: '9px' }}>
                                        <input {...register("reason", { required: "Please select any one option!" })} id='nudes' type="radio" value="Contains nudity." />
                                        <label htmlFor="nudes">Contains nudity.</label><br />
                                    </div>

                                    <div className="radio-option" style={{ display: 'flex', gap: '9px' }}>
                                        <input {...register("reason", { required: "Please select any one option!" })} id='hateSpeech' type="radio" value="Contains offensive messages or spread hate." />
                                        <label htmlFor="hateSpeech">Contains offensive messages or spread hate.</label>
                                    </div>
                                </div>


                                <input type="submit" />

                            </form>

                        </Box>
                    </Modal>
                </div>

                <div className="content">
                    <p>{post?.desc}</p>
                    <img src={post?.images} alt='Post' />
                </div>
                <div className="info">
                    <div className="info-left">
                        <div className="item">
                            {
                                post?.likes?.includes(id) ? <FavoriteIcon sx={{ color: 'red' }} onClick={dislike} /> : <FavoriteBorderOutlinedIcon onClick={like} />
                            }
                            <span>{`${likeCount} like${likeCount <= 1 ? '' : 's'}`}</span>
                        </div>
                        <div className="item" onClick={postComments}>
                            <CommentIcon />
                            <span>{`${commentCount} comment${commentCount <= 1 ? '' : 's'}`}</span>
                        </div>
                        <div className="item">
                            <SendIcon />
                        </div>
                    </div>
                    <div className="info-right">
                        <div className="item">
                            {
                                user?.savedPosts?.includes(post?._id) ? <BookmarkIcon onClick={save} /> : <BookmarkBorderOutlinedIcon onClick={save} />
                            }
                        </div>
                    </div>
                </div>
                {
                    showComments &&
                    <Comments data={post?.comments} id={post?._id} />
                }
            </div>
        </div>
    )
}

export default Post