import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


const Search = () => {
  return (
    <div >
        {/* <img src={Logo} alt='' style={{height: '40px', width: '40px'}}/> */}
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
  )
}

export default Search