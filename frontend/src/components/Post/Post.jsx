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
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from '../../redux/auth/userSlice';

const Post = ({ data, id }) => {

    const [post, setPost] = useState(data);
    const likeCount = data?.likes?.length;
    const commentCount = data?.comments?.length;
    const [showComments, setShowComments] = useState(false);
    const { user } = useSelector(state => state.userData);
    const dispatch = useDispatch()
    
    //Like or Dislike Post
    const like = async () => {
        try {
            const response = await POSTS.patch(`/${post._id}/like`);
            toast.success(response.data.message);
            if (response.data.message === 'liked') {
                setPost({ ...post }, post?.likes?.push(id));
            } else {
                const index = post?.likes?.indexOf(id);
                setPost({ ...post }, post?.likes?.splice(index, 1));
            }
        } catch (error) {
            toast.error('Some unknown error!')
        }
    }


    //Save and unsave post
    const save = async () => {
        try {
            const response = await POSTS.patch(`/${post._id}/save`);
            toast.success(response.data.message);
            if(response.data.message === 'saved'){
                user?.savedPosts?.push()
            }
        } catch (error) {
            toast.error('Some unknown error!')
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
                                post?.likes?.includes(id) ? <FavoriteIcon sx={{ color: 'red' }} onClick={like} /> : <FavoriteBorderOutlinedIcon onClick={like} />
                            }
                            <span>{`${likeCount} like${likeCount <= 1 ? '' : 's'}`}</span>
                        </div>
                        <div className="item" onClick={() => setShowComments(!showComments)}>
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
                    <Comments data={post?.comments} />
                }
            </div>
        </div>
    )
}

export default Post