import React, { useEffect, useState } from 'react'
import './PostShare.scss'
import CollectionsIcon from '@mui/icons-material/Collections';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, Button, Container, Modal, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { API_POST } from '../../axios';
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import toast from 'react-hot-toast';
import { Box } from '@mui/system';

const PostShare = ({data}) => {
  const {posts, setPosts} = data;
  const user = useSelector(state => state.userData.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    desc: '',
    tags: '',
  })

  useEffect(() => {
    setFormData({...formData,...image})
    //eslint-disable-next-line
  },[image])
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(256, 256, 256)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black',
  };

  const imageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: img
      });
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(showLoading());
      handleClose();
      const response = await API_POST.post('/', {...formData})
      dispatch(hideLoading());
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        setPosts([response.data.post,...posts]);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message)
    }
  }



  return (
    <Container maxWidth='md' sx={{ paddingTop: '1rem' }}>
      <div className='PostShare'>
        <Avatar src={user?.profilePic} />
        <div>
          <input type="text" name="" id="" placeholder="What's happening" />
          <div className="PostOptions">
            <div className="option" onClick={handleOpen}> 
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
            <Button variant='outlined' sx={{ color: 'black', borderColor: 'black' }} > SHARE </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" align='center' variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                  Create a new post!
                </Typography>
                <form encType="multipart/form-data" className='post-form' onSubmit={handleSubmit}>
                  <TextField size='small' sx={{ marginBottom: '20px', color: 'white', }} fullWidth label='Description' value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} />
                  {/* <TextField size='small' fullWidth label='Tags' value={formData.tags} onChange={(e) => setFormData({...formData, tags : e.target.value})}/> */}
                  <div className="fileInput">
                    <TextField type='file' multiple={false} onChange={imageChange} required/>
                  </div>
                  <Button sx={{ marginTop: '20px' }} variant='contained' type='submit'>POST</Button>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default PostShare