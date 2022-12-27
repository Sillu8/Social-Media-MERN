import React, { useEffect, useState } from 'react'
import { Avatar, Button, FormLabel, List, ListItem, TextField } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import './UserInfo.scss'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { API_USER } from '../../axios';
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import { useForm } from 'react-hook-form';
import { setUser } from '../../redux/auth/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

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

const button = {
    display: 'inline-block',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '600',
    borderRadius: '8px',
    padding: '10px 22px',
    border: 'none',
    transition: 'box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s',
    background: 'linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%)',
    color: '#fff',
}





const UserInfo = ({ isMyProfile }) => {


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userData);
    const navigate = useNavigate();
    const { username } = useParams();

    const [userData, setUserData] = useState({})
    const [followersData, setFollowersData] = useState([]);
    const [followingsData, setFollowingsData] = useState([]);

    useEffect(() => {


        (async () => {
            try {
                dispatch(showLoading());
                const res = await API_USER.get(`/${username}`);
                dispatch(hideLoading());
                if (res.data.status === 'success') {
                    setUserData(res.data.data.user);
                }
            } catch (error) {
                dispatch(hideLoading());
                console.log(error);
            }
        })();
    }, [username])


    const getFollowersData = async () => {
        try {
            dispatch(showLoading())
            const res = await API_USER.get(`/followers/${username}`);
            dispatch(hideLoading());
            setFollowersData(res.data.data.followers);
        } catch (error) {
            dispatch(hideLoading());
            toast.error(error.response.data.message);
        }
    }

    const getFollowingsData = async () => {
        try {
            dispatch(showLoading())
            const res = await API_USER.get(`/followings/${username}`)
            dispatch(hideLoading());
            setFollowingsData(res.data.data.following);
        } catch (error) {
            dispatch(hideLoading());
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


    //Modal for edit profile
    const handleProfileModalOpen = () => {
        setProfileModal(true)
    };
    const [profileModal, setProfileModal] = useState(false);
    const handleProfileModalClose = () => setProfileModal(false);


    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const onSubmit = async (data) => {
        try {
            console.log(register);
            dispatch(showLoading());
            const res = await API_USER.put('/', data);
            dispatch(hideLoading());
            dispatch(setUser(res.data.user))
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }


    return (
        <div className="ProfileData">
            <div className="profilePic">
                <Avatar sx={{ width: '150px', height: '150px' }} />
            </div>
            <div className="userInfo">
                <div className="top">
                    <span>{username}</span>
                    {
                        isMyProfile &&
                        <Button variant='outlined' onClick={handleProfileModalOpen}>Edit Profile</Button>
                    }

                    {
                        !isMyProfile && 
                        <Button variant='outlined'>{'Follow'}</Button>
                    }
                    {/* <SettingsIcon sx={{ cursor: 'pointer' }} /> */}

                    {/* Profile Modal */}
                    <Modal
                        open={profileModal}
                        onClose={handleProfileModalClose}
                        aria-labelledby="profileModal"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="profileModal" variant="h6" component="h2" align='center' sx={{ marginBottom: '8px' }}>
                                Edit Profile
                            </Typography>
                            <div className="profile-form">
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <TextField label='Name' defaultValue={user?.name} {...register("name", { required: true, maxLength: 30 })} size='small' sx={{ marginTop: '5px', marginBottom: '5px' }} />
                                    <TextField defaultValue={user?.details?.bio} label='Bio' {...register("bio")} size='small' sx={{ marginTop: '5px', marginBottom: '5px' }} />
                                    <TextField defaultValue={user?.details?.work} label='Work' {...register("work")} size='small' sx={{ marginTop: '5px', marginBottom: '5px' }} />
                                    <TextField defaultValue={user?.details?.education} label='Education' {...register("education")} size='small' sx={{ marginTop: '5px', marginBottom: '5px' }} />
                                    <TextField defaultValue={user?.details?.city} label='City' {...register("city")} size='small' sx={{ marginTop: '5px', marginBottom: '5px' }} />

                                    <div style={{ padding: '10px 0px' }}>
                                        <FormLabel htmlFor="gender">Gender</FormLabel><br />
                                        <select {...register("gender", { required: true })} defaultValue={user?.details?.gender}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="genderqueer">Genderqueer</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label htmlFor="relation">Relation</label><br />
                                        <label htmlFor="" style={{ marginRight: '5px' }}>Single</label>
                                        <input {...register("relation", { required: true })} type="radio" value="single" style={{ marginRight: '5px' }} />
                                        <label htmlFor="" style={{ marginRight: '5px' }}>Married</label>
                                        <input {...register("relation", { required: true })} type="radio" value="married" style={{ marginRight: '5px' }} />
                                    </div>

                                    <input type="submit" value={'UPDATE'} style={button} />
                                </form>
                            </div>
                        </Box>
                    </Modal>
                </div>


                <div className="connection">
                    <span className='posts'>{`${userData?.posts?.length} post${userData?.posts?.length <= 1 ? '' : 's'}`}</span>
                    <span className='followers' onClick={handleOpen}>{`${userData?.followers?.length} followers`}</span>
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
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '3px' }}>{follower.username}</Typography>
                                ))}
                            </List>
                        </Box>
                    </Modal>


                    <span className='following' onClick={handleFollowingOpen}>{`${userData?.following?.length} following`}</span>
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
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '3px', cursor: 'pointer' }} onClick={() => {navigate(`/profile/${follower.username}`); handleFollowingClose();}}>{follower.username}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Modal>
                </div>


                <div className="userDescription">
                    <span>{userData?.name}</span>
                    <span>{userData?.details?.bio}</span>
                </div>
            </div>
        </div>
    )
}

export default UserInfo