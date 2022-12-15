import React, { useState } from 'react'
import { Avatar, Button, List, ListItem } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import './UserInfo.scss'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { API_USER } from '../../axios';
import toast from 'react-hot-toast'

const UserInfo = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const dispatch = useDispatch();
    const [followersData, setFollowersData] = useState([]);
    const [followingsData, setFollowingsData] = useState([]);

    const getFollowersData = async () => {
        try {
            const res = await API_USER.get(`/followers/${user?._id}`)
            setFollowersData(res.data.data.followers);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const getFollowingsData = async () => {
        try {
            const res = await API_USER.get(`/followings/${user?._id}`)
            setFollowingsData(res.data.data.following);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    const handleOpen = () => {
        getFollowersData();
        setFollowersOpen(true)
    };
    const [followersOpen, setFollowersOpen] = useState(false);
    const handleClose = () => setFollowersOpen(false);


    const handleFollowingOpen = () => {
        getFollowingsData();
        setFollowingsOpen(true)
    };
    const [followingsOpen, setFollowingsOpen] = useState(false);
    const handleFollowingClose = () => setFollowingsOpen(false);


    const user = useSelector(state => state.userData.user);


    return (
        <div className="ProfileData">
            <div className="profilePic">
                <Avatar sx={{ width: '150px', height: '150px' }} />
            </div>
            <div className="userInfo">
                <div className="top">
                    <span>{user?.username}</span>
                    <Button variant='outlined'>Edit Profile</Button>
                    <SettingsIcon sx={{ cursor: 'pointer' }} />
                </div>
                <div className="connection">
                    <span className='posts'>{`${user?.posts?.length} post${user?.posts?.length <= 1 ? '' : 's'}`}</span>
                    <span className='followers' onClick={handleOpen}>{`${user?.followers?.length} followers`}</span>
                    <Modal
                        open={followersOpen}
                        onClose={handleClose}
                        aria-labelledby="followersModal"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="followersModal" variant="h6" component="h2" align='center'>
                                Followers
                            </Typography>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {followersData.map((follower) => (
                                    // <ListItem
                                    //     key={follower._id}
                                    //     disableGutters
                                    //     secondaryAction={
                                    //         <Button variant='contained' onClick={()=>unfollowUser(follower?._id)}>following</Button>
                                    //     }
                                    // >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '3px' }}>{follower.username}</Typography>
                                    // </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Modal>
                    <span className='following' onClick={handleFollowingOpen}>{`${user?.following?.length} following`}</span>

                    <Modal
                        open={followingsOpen}
                        onClose={handleFollowingClose}
                        aria-labelledby="followingModal"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="followingModal" variant="h6" component="h2" align='center'>
                                Followings
                            </Typography>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {followingsData.map((follower) => (
                                    <ListItem
                                        key={follower._id}
                                        disableGutters
                                        secondaryAction={
                                            <Button variant='contained'>following</Button>
                                        }
                                    >
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '3px' }}>{follower.username}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Modal>
                </div>
                <div className="userDescription">
                    <span>{user?.name}</span>
                    <span>{user?.details?.bio}</span>
                </div>
            </div>
        </div>
    )
}

export default UserInfo