import React, { Fragment, useState, useRef } from 'react'
import './ChatBody.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp';
import { TextField, Typography } from '@mui/material'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CONVERSATION, MESSAGE_API } from '../../axios';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import moment from "moment";
import { io } from 'socket.io-client'

const ChatBody = ({ state }) => {

    const { user } = useSelector(state => state.userData);
    const { currentChat, setCurrentChat } = state;
    const showUsers = () => { if (currentChat) setCurrentChat(null); }

    const [messages, setMessages] = useState();
    const [friend, setFriend] = useState()
    const [newMessage, setNewMessage] = useState();
    const [arrivalMsg, setArrivalMsg] = useState()

    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:4001');

        socket.current.on('getMessage', data => {
            setArrivalMsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])

    useEffect(() => {
        arrivalMsg && currentChat?.members.includes(arrivalMsg.sender) &&
            setMessages(prev => [...prev, arrivalMsg])
    }, [arrivalMsg, currentChat]);


    useEffect(() => {
        socket.current.emit('addUser', user?._id);
        socket.current.on('getUsers', users => {
            console.log(users);
        })
    }, [user])



    const sendMsg = async () => {

        const receiverId = currentChat?.members.find(member => member !== user?._id);

        socket.current.emit('sendMessage', {
            senderId: user?._id,
            receiverId,
            text: newMessage,
        });


        try {
            if (newMessage) {
                const response = await MESSAGE_API.post('/', {
                    sender: user?._id,
                    text: newMessage,
                    conversationId: currentChat?._id
                });
                setMessages([...messages, response.data.message]);
                setNewMessage('')
            }
        } catch (error) {
            console.log(error);
        }
    }


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

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])


    return (
        <div className="chat-body">
            <div className="chat-body-header">
                <div className="logo" onClick={showUsers}> <ArrowBackIosIcon /> </div>
                <div className="username">{friend?.name}</div>
            </div>
            <div className="chat-content">
                {
                    messages ?
                        messages.map(message => {
                            return (
                                <div key={message?._id}>
                                    <div className={message?.sender === user?._id ? 'my-message' : 'message'}>
                                        <Typography ref={scrollRef} variant='body1' sx={{ padding: '0px', margin: '0px' }}>{message?.text}</Typography>
                                        <div className={message?.sender === user?._id ? "message-timestamp-right" : "message-timestamp-left"}>{moment(message?.createdAt).fromNow()}</div>
                                    </div>
                                </div>
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
                    <TextField variant='filled' required sx={{ backgroundColor: 'white' }} multiline size='small' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                </div>
                <div className="send-btn">
                    <SendIcon sx={{ cursor: 'pointer' }} onClick={sendMsg} />
                </div>
            </div>
        </div>
    )
}

export default ChatBody