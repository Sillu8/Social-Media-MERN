import React, { useState } from 'react'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Typography } from '@mui/material'
import './Chat.scss'
import Conversations from '../Conversations/Conversations';
import ChatBody from '../ChatBody/ChatBody';



const Chat = () => {

  const [showChat, setShowChat] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);

  

  return (
    <div className='chat'>
      <div className="chat-container">
        <div className={showChat ? 'chat-header chat-open' : 'chat-header'} onClick={() => setShowChat(!showChat)}>
          <Typography variant='h6' alignSelf={'flex-start'} >Message</Typography>
          {showChat ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
        </div>
        {
          showChat &&

          <div className="chat-main">

            {
              currentChat
                ?
                <ChatBody state={{ currentChat, setCurrentChat }} />
                :
                <Conversations state={{ currentChat, setCurrentChat }} />
            }



          </div>
        }
      </div>
    </div>
  )
}

export default Chat