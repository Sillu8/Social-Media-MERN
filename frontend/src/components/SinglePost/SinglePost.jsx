import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { POSTS } from '../../axios'
import { hideLoading, showLoading } from '../../redux/loading/loadSlice'
import Post from '../Post/Post'
import './singlePost.scss'

const SinglePost = () => {

    const dispatch = useDispatch();
    const { postId } = useParams();

    const [post, setPost] = useState({})

    useEffect(() => {
        (async ()=>{
            try {
                dispatch(showLoading());
                const res = await POSTS.get(`/data/${postId}`);
                dispatch(hideLoading());
                setPost(res.data.post);
            } catch (error) {
                dispatch(hideLoading());
                console.log(error);
            }
        })()
    }, [])



    return (
        <div className='singlePost'>
            <div className="container">
                <Post data={post} id={post?._id}/>
            </div>
        </div>
    )
}

export default SinglePost