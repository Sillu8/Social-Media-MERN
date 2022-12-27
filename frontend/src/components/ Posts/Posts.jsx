import React, { useEffect, useState } from 'react'
import './Posts.scss'
import Post from '../Post/Post'
import toast from 'react-hot-toast'
import { POSTS } from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/loading/loadSlice'
import PostShare from '../PostShare/PostShare'

const Posts = () => {

  const [posts, setPosts] = useState([])
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userData);
  useEffect(() => {

    (async () => {
      try {
        dispatch(showLoading());
        const response = await POSTS.get('/');
        dispatch(hideLoading());
        if (response.data.status === 'success') {
          setPosts(response.data.data.posts);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    })();


  }, [])





  return (
    <>
      <PostShare data={{ posts, setPosts }} />
      <div className='Posts'>
        {
          posts?.map((post) => {
            return <div key={post?._id}><Post data={post} id={user?._id} /></div>
          })
        }
      </div>
    </>
  )
}

export default Posts