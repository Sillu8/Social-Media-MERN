import React from 'react'
import Posts from '../ Posts/Posts'
import PostShare from '../PostShare/PostShare'
import Stories from '../Stories/Stories'
import './PostSide.scss'

const PostSide = () => {
  return (
    <div className='.PostSide'>
        <Stories />
        <PostShare />
        <Posts />
    </div>
  )
}

export default PostSide