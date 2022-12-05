import React from 'react'
import Chat from '../Chat/Chat'
import Suggestions from '../Suggestions/Suggestions'
import './Rightbar.scss'

const Rightbar = () => {


  return (
    <div className='RightSidebar'>
      <div className="container">
        <div className="item">
          <Suggestions />
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default Rightbar