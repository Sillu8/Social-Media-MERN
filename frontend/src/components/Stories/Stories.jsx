import { Avatar } from '@mui/material';
import React from 'react';
import './stories.scss';
import User from '../../images/birds.jpg'

const Stories = () => {
    const stories = [
        {
            id: 10,
            name: 'Messi',
            img: 'https://images.pexels.com/photos/1915182/pexels-photo-1915182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 7,
            name: 'Rono',
            img: 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 8,
            name: 'Pedri',
            img: 'https://images.pexels.com/photos/1643773/pexels-photo-1643773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 6,
            name: 'Iniesta',
            img: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    ]



  return (
    <div className='stories'>

        <div className="story">
            <img src={User} alt="" />
            <span>John Doe</span>
            <button>+</button>
        </div>
        {
          stories.map(story => {
            return (
                <div className="story">
                    <img src={story.img} alt='story'/>
                    <span>{story.name}</span>
                </div>
            )
          })  
        }
    </div>
  )
}

export default Stories