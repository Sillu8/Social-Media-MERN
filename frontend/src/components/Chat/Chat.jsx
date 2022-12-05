import React, { useState } from 'react'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Avatar, Divider, InputAdornment, TextField, Typography } from '@mui/material'
import './Chat.scss'
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Chat = () => {

  const [showChat, setShowChat] = useState(true);
  const [openChat, setOpenChat] = useState(true);

  const showUsers = (prevState) => setOpenChat(!openChat);

  const chatWithUser = () => {
    setOpenChat(!openChat);
  }

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
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

  const users = [
    {
      name: 'Shamil',
    },
    {
      name: 'Leo',
    },
    {
      name: 'Rono',
    },
    {
      name: 'Njr',
    },
    {
      name: 'Gavi',
    },
    {
      name: 'Pedri',
    },
    {
      name: 'Pique',
    },
    {
      name: 'Xavi',
    },
  ]

  const messages = [
    {
      name: 'Leo',
      message: 'How are you?',
    },
    {
      name: 'You',
      message: 'Good, what about you?',
    },
    {
      name: 'Leo',
      message: 'Good, excited for the next match!',
    },
    {
      name: 'You',
      message: 'Me too! Hope you win.',
    },
    {
      name: 'Leo',
      message: `Well, that's the goal`,
    },
    {
      name: 'Leo',
      message: 'How are you?',
    },
    {
      name: 'You',
      message: 'Good, what about you?',
    },
  ]


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
              !openChat &&
              <div className="users">
                <div className="search">
                  <TextField
                    fullwidth
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
                  users.map(user => {
                    return (
                      <>
                        <div className="user" onClick={() => chatWithUser()}>
                          <Avatar src='' sx={{ width: '30px', height: '30px' }} />
                          <Typography alignSelf={'flex-start'} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>{user?.name}</Typography>
                        </div>
                        <Divider />
                      </>
                    )
                  })
                }
              </div>
            }

            {
              openChat &&
              <div className="chat-body">
                <div className="chat-body-header">
                  <div className="logo" onClick={showUsers}> <ArrowBackIosIcon /> </div>
                  <div className="username">Username</div>
                </div>
                <Divider />
                <div className="chat-content">
                  {
                    messages.map(message => {
                      return (
                        <>
                          <div className={message.name === 'You' ? 'my-message' : 'message'}>
                            <Typography variant='body1' sx={{ padding: '0px', margin: '0px' }}>{message?.message}</Typography>
                            <div className={message.name === 'You' ? "message-timestamp-right" : "message-timestamp-left"}>1 : 37</div>
                          </div>
                        </>
                      )
                    })
                  }
                </div>
                <div className="write-message">
                  <div className="emojis">
                    Emojies
                  </div>
                  <div className="input-space">
                    <BootstrapInput variant='filled' size='small'/>
                  </div>
                  <div className="send-btn">
                    <button>send</button>
                  </div>
                </div>
              </div>
            }



          </div>
        }
      </div>
    </div>
  )
}

export default Chat