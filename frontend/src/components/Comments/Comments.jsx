import React from 'react';
import './comments.scss';
import { comments } from '../PostData';
import { Avatar, Button, TextField } from '@mui/material';

const Comments = () => {
    return (
        <div className='comments'>
            <div className="write">
                <Avatar sx={{width:'25px', height:'25px', cursor: 'pointer'}}/>
                <TextField size='small' id="outlined-basic" variant="outlined" sx={{width:'70%'}} multiline/>
                <Button variant='contained' sx={{width:'20px'}} size='small'>POST</Button>
            </div>
            {
                comments.map(comment => {
                    return (
                        <div className="comment">
                            <Avatar src={comment.profilePic} sx={{ width: '25px', height: '25px', cursor: 'pointer' }} />
                            <div className="comment-info">
                                <span>{comment.name}</span>
                                <p>{comment.desc}</p>
                            </div>
                            <span className='date'>1 hour ago</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Comments