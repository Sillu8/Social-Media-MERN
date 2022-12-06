import React, { Fragment, useState } from 'react'
import './ChatBody.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp';
import { Button, Divider, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CONVERSATION, MESSAGE_API } from '../../axios';
import { useSelector } from 'react-redux';
import moment from "moment";

const ChatBody = ({ state }) => {

    const { user } = useSelector(state => state.userData);
    const { currentChat, setCurrentChat } = state;
    const showUsers = () => { if (currentChat) setCurrentChat(null); }
    const [messages, setMessages] = useState();
    const [friend, setFriend] = useState()

    useEffect(() => {
        (async () => {
            try {
                const friendId = currentChat.members.find(id => id !== user?._id)
                const [messageRes, currentChatRes] = await Promise.all([MESSAGE_API.get(`/${currentChat?._id}`), CONVERSATION.get(`/${friendId}`)]);
                setMessages(messageRes.data.messages);
                setFriend(currentChatRes.data.friend);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        })();
    }, [])



    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(1),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
            border: '1px solid #ced4da',
            fontSize: 16,
            width: '230px',
            padding: '4px 8px',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }));


    return (
        <div className="chat-body">
            <div className="chat-body-header">
                <div className="logo" onClick={showUsers}> <ArrowBackIosIcon /> </div>
                <div className="username">{friend?.name}</div>
            </div>
            <Divider />
            <div className="chat-content">
                {
                    messages ?
                        messages.map(message => {
                            return (
                                <Fragment key={message?._id}>
                                    <div className={message?.sender === user?._id ? 'my-message' : 'message'}>
                                        <Typography variant='body1' sx={{ padding: '0px', margin: '0px' }}>{message?.text}</Typography>
                                        <div className={message?.sender === user?._id ? "message-timestamp-right" : "message-timestamp-left"}>{moment(message?.createdAt).fromNow()}</div>
                                    </div>
                                </Fragment>
                            )
                        })
                        :
                        <>Hey Type Something</>
                }
            </div>
            <div className="write-message">
                <div className="emojis">
                    <EmojiEmotionsSharpIcon sx={{ cursor: 'pointer' }} />
                </div>
                <div className="input-space">
                    <BootstrapInput variant='filled' size='small' />
                </div>
                <div className="send-btn">
                    <Button variant='contained' sx={{ backgroundColor: 'black' }}>Send</Button>
                </div>
            </div>
        </div>
    )
}

export default ChatBody