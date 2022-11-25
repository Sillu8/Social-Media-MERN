import React from 'react'
import './Posts.scss'
import { PostData } from '../PostData'
import Post from '../Post/Post'

const Posts = () => {
  return (
    <div className='Posts'>
      {
        PostData.map((post,id) => {
          return <Post data={post} id={id}/>
        })
      }
    </div>
  )
}

export default Posts