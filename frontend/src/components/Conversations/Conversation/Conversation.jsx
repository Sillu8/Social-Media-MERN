import React, { useState } from 'react'
import { Avatar, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CONVERSATION } from '../../../axios';

const Conversation = ({ state, conversation }) => {

    const { user } = useSelector(state => state.userData);
    const { setCurrentChat } = state;
    const [friend, setFriend] = useState()

    useEffect(() => {
        const friendId = conversation?.members?.find(id => id !== user?._id);

        (async () => {
            try {
                const response = await CONVERSATION.get(`/${friendId}`);
                setFriend(response.data.friend)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])



    return (
        <div className="user" onClick={() => setCurrentChat(conversation)}>
            <Avatar src='' sx={{ width: '30px', height: '30px' }} />
            <Typography alignSelf={'flex-start'} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{friend?.name}</Typography>
            <Typography alignSelf={'flex-start'} sx={{ cursor: 'pointer' }}>{friend?.username}</Typography>
        </div>
    )
}

export default Conversation