import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './Post.scss'
import { Container } from '@mui/system';

const Post = ({ data }) => {
    return (
        <Container maxWidth='md' sx={{marginTop: '1rem'}}>
            <div className='Post'>
                <div className="detail">
                    <span><b>{data.name}</b></span>
                    <span>{data.desc}</span>
                </div>
                <img src={data.img} alt='' />

                <div className="postReact">
                    {data.liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                    <CommentIcon />
                    <SendIcon />
                </div>

                <span>{data.likes} likes</span>
            </div>
        </Container>
    )
}

export default Post