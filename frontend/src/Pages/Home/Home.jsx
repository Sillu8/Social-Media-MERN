import React from 'react'

import LeftSide from '../../components/LeftSide/LeftSide'
import PostSide from '../../components/PostSide/PostSide'
import './Home.scss'

const Home = () => {


  return (
    <div className='Home'>
        {/* <div className="blur blur1"></div> */}
        {/* <div className="blur blur2"></div>  */}
        <LeftSide />
        <PostSide />
    </div>
  )
}

export default Home