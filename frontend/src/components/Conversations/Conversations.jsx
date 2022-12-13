import React, { Fragment, useEffect, useState } from 'react'
import { Divider, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import './Conversations.scss'
import toast from 'react-hot-toast';
import { CONVERSATION } from '../../axios';
import Conversation from './Conversation/Conversation';
import { useSelector } from 'react-redux';

const Conversations = ({ state }) => {

    const { user } = useSelector(state => state.userData);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {

        (async () => {
            try {
                const response = await CONVERSATION.get('/');
                setConversations(response.data.conversation)
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        })();
    }, [user?._id])




    return (
        <div className="users">
            <div className="search">
                <TextField
                    size='small'
                    id="input-with-icon-textfield"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize='small' />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </div>
            {
                conversations.map(chat => {
                    return (
                        <Fragment key={chat._id}>
                            <Conversation conversation={chat} state={state} />
                            <Divider />
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default Conversations