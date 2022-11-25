import React, { useState } from 'react'
import './PostShare.scss'
import Post1 from '../../images/birds.jpg';
import CollectionsIcon from '@mui/icons-material/Collections';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, Container } from '@mui/material'
import { useRef } from 'react';

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef()

  const imageChange = (event) => {
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      })
    }
  }


  return (
    <Container maxWidth='md' sx={{ paddingTop: '1rem' }}>
      <div className='PostShare'>
        <img src={Post1} alt="" />
        <div>
          <input type="text" name="" id="" placeholder="What's happening" />
          <div className="PostOptions">
            <div className="option" onClick={()=>imageRef.current.click()}>
              <CollectionsIcon /> Photos
            </div>
            <div className="option">
              <SlowMotionVideoIcon /> Videos
            </div>
            <div className="option">
              <PlaceIcon /> Location
            </div>
            <div className="option">
              <CalendarMonthIcon /> Schedule
            </div>
            <Button variant='outlined' sx={{ color: 'black', borderColor: 'black',  }}> SHARE </Button>
            <div style={{display:'none'}}>
              <input type="file" name="myImage" ref={imageRef} onChange={imageChange}/>
            </div>
          </div>
          {
            image && 
              <div className="previewImage">
                <CloseIcon onClick={()=>setImage(null)}/>
                <img src={image.image} alt='' />
              </div>
          }
        </div>
      </div>
    </Container>
  )
}

export default PostShare