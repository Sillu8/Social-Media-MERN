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

const Post = ({ data, id }) => {

    const likes = Object.keys(data?.likes).length;
    const comments = data?.comments?.length;
    const [showComments, setShowComments] = useState(false);


    const like = async () => {
        try {
            
        } catch (error) {
            toast.error('Some unknown error!')
        }
    }

    const save = async () => {
        try {
            
        } catch (error) {
            toast.error('Some unknown error!')
        }
    }

    return (
        <div className='post' key={data._id}>
            <div className="container">
                <div className="user">
                    <div className="user-info">
                        <Avatar src={data?.userProfilePic} sx={{ width: '30px', height: '30px', cursor: 'pointer' }} />
                        <div className="details">
                            <Link to={`/profile/${data?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className='name'>{data?.userName}</span>
                            </Link>
                            <span className='date'>{
                                '1 min ago'
                            }</span>
                        </div>
                    </div>
                    <MoreVertIcon sx={{ cursor: 'pointer' }} />
                </div>

                <div className="content">
                    <p>{data?.desc}</p>
                    <img src={data?.images} alt='Post' />
                </div>
                <div className="info">
                    <div className="info-left">
                        <div className="item">
                            {
                                data?.likes[id] ? <FavoriteIcon sx={{ color: 'red' }} onClick={like}/> : <FavoriteBorderOutlinedIcon onClick={like}/>
                            }
                            <span>{ `${likes} like${likes <= 1 ? '' : 's'}`  }</span>
                        </div>
                        <div className="item" onClick={()=>setShowComments(!showComments)}>
                            <CommentIcon />
                            <span>{ `${comments} comment${comments <= 1 ? '' : 's'}`  }</span>
                        </div>
                        <div className="item">
                            <SendIcon />
                        </div>
                    </div>
                    <div className="info-right">
                        <div className="item">
                            {
                                data?.saves[id] ? <BookmarkIcon onClick={save}/> : <BookmarkBorderOutlinedIcon onClick={save}/>
                            }
                        </div>
                    </div>
                </div>
                {
                    showComments && 
                    <Comments data={data?.comments}/>
                }
            </div>
        </div>
    )
}

export default Post