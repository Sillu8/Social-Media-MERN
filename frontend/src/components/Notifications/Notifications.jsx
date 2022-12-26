import React, { useEffect, useState } from 'react'
import './Notifications.scss'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import { API_USER } from '../../axios';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userData);
    const navigate = useNavigate()

    const [value, setValue] = useState('read');
    const [readNotifications, setReadNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getReadNotifications();
        getUnreadNotifications();
    }, [user])


    const getReadNotifications = async () => {
        try {
            dispatch(showLoading());
            const res = await API_USER.get(`/notifications/seen/${user?._id}`);
            dispatch(hideLoading());
            setReadNotifications(res.data.result.seenNotifications);
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }

    const getUnreadNotifications = async () => {
        try {
            dispatch(showLoading());
            const res = await API_USER.get(`/notifications/unseen/${user?._id}`);
            dispatch(hideLoading());
            setUnreadNotifications(res.data.result.unseenNotifications);
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }

    const setNotificationAsRead = async (notificationId, path) => {
        try {
            dispatch(showLoading());
            const res = await API_USER.patch(`/notification/${notificationId}`);
            setReadNotifications(res.data.updatedUser.seenNotifications);
            setUnreadNotifications(res.data.updatedUser.unseenNotifications);
            dispatch(hideLoading());
            navigate(path)
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }



    return (
        <div className='Notifications'>
            <div className="container">
                <h2>Notifications</h2>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="Notifications tab">
                                <Tab label="Read" value="read" />
                                <Tab label="Unread" value="unread" />
                            </TabList>
                        </Box>
                        <TabPanel value="read">
                            {
                                readNotifications.map(notification => {
                                    return (
                                        <div className="notification" id={notification._id} onClick={() => navigate(notification.path)}>
                                            <span>{notification.message}</span>
                                        </div>
                                    )
                                })
                            }
                        </TabPanel>

                        {/* Unread Notifications */}
                        <TabPanel value="unread">
                            {
                                unreadNotifications.map(notification => {
                                    return (
                                        <div className="notification unread" id={notification._id} onClick={() => setNotificationAsRead(notification._id, notification.path)}>
                                            <span>{notification.message}</span>
                                        </div>
                                    )
                                })
                            }
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default Notifications