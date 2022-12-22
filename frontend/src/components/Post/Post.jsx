import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './Post.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom'
import Comments from '../Comments/Comments';
import toast from 'react-hot-toast';
import moment from "moment";
import { POSTS } from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from '../../redux/auth/userSlice';

const Post = ({ data, id }) => {

    const [post, setPost] = useState(data);
    let likeCount = post?.likes?.length;
    let commentCount = post?.comments?.length;
    const [showComments, setShowComments] = useState(false);
    const { user } = useSelector(state => state.userData);
    const dispatch = useDispatch()

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
        <div className='post' key={data._id}>
            <div className="container">
                <div className="user">
                    <div className="user-info">
                        <Avatar src={post?.userProfilePic} sx={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                        <div className="details">
                            <Link to={`/profile/${post?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className='name'>{post?.userName}</span>
                            </Link>
                            <span className='date'>{moment(post?.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    {/* Icon for buttons */}
                    <select name="option" id="" className='post-options'>
                        <option value="">Report</option>
                        <option value="">Edit</option>
                        <option value="">Delete</option>
                    </select>
                    <MoreVertIcon sx={{ cursor: 'pointer' }} />
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