import React, { useEffect } from 'react'
import './Posts.scss'
import Post from '../Post/Post'
import toast from 'react-hot-toast'
import { POSTS } from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/loading/loadSlice'
import { useState } from 'react'

const Posts = () => {

  const dispatch = useDispatch();
  const [posts, setPosts] = useState([])
  const user = useSelector(state => state.userData.user);
  useEffect(() => {

    (async () => {
      try {
        dispatch(showLoading());
        const response = await POSTS.get('/');
        dispatch(hideLoading());
        if(response.data.status === 'success'){
          setPosts(response.data.data.posts);
        }
      } catch (error) {
        dispatch(hideLoading());
        toast.error('Some unknown error!')
      }
    })();

    //eslint-disable-next-line
  }, [])





  return (
    <div className='Posts'>
      {
        posts.map((post) => {
          return <Post data={post} id={user?._id}/>
        })
      }
    </div>
  )
}

export default Posts