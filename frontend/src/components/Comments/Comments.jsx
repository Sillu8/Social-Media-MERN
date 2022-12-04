import React from 'react';
import { useForm } from 'react-hook-form';
import './comments.scss';
import { Avatar, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { POSTS } from '../../axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import moment from 'moment';

const Comments = ({ data, id }) => {

    const dispatch = useDispatch();
    const [comments, setComments] = useState(data);
    // eslint-disable-next-line
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            dispatch(showLoading());
            const response = await POSTS.patch(`${id}/comment`, data);
            dispatch(hideLoading());
            resetField('Comment');
            setComments([response.data.comment, ...comments])
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    return (
        <div className='comments'>
            <div className="write">
                <Avatar sx={{ width: '25px', height: '25px', cursor: 'pointer' }} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField size='small' id="outlined-basic" variant="outlined" sx={{ width: '70%' }} multiline {...register("Comment", { required: true })} />

                    <Button variant='contained' sx={{ width: '20px' }} size='small' type='submit'>POST</Button>
                </form>
            </div>
            {
                comments?.map(comment => {
                    return (
                        <div className="comment" key={comment._id}>
                            <Avatar src={comment?.commentedUserpic} sx={{ width: '25px', height: '25px', cursor: 'pointer' }} />
                            <div className="comment-info">
                                <span>{comment?.commentedUsername}</span>
                                <p>{comment?.comment}</p>
                            </div>
                            <span className='date'>{moment(comment?.time).fromNow()}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Comments