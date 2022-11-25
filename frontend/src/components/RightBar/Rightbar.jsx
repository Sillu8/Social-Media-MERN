import React from 'react'
import Suggestions from '../Suggestions/Suggestions'
import './Rightbar.scss'

const Rightbar = () => {
  return (
    <div className='RightSidebar'>
      <div className="container">
        <div className="item">
          <Suggestions />
        </div>
      </div>
    </div>
  )
}

export default Rightbar