import React from 'react'
import './Search.scss'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../../images/bird.jpg'


const Search = () => {
  return (
    <div className='LogoSearch'>
        {/* <img src={Logo} alt='' style={{height: '40px', width: '40px'}}/> */}
        <TextField
        sx={{width: '70%'}}
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
  )
}

export default Search