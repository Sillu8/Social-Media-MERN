import React, { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useDispatch } from 'react-redux';
import { API_USER } from '../../axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Search = () => {

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`/profile/${event.target.value}`)
    }
  }

  const searchUsers = async () => {
    try {
      const res = await API_USER.get(`/search?q=${query}`);
      setSearchResults(res.data.users)
    } catch (error) {
      toast.error('Some unknown error!');
      console.log(error);
    }
  }

  return (
    <>
      <Autocomplete
        size='small'
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={
          searchResults.map(option => option.username)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            value={query}
            onChange={(e, value) => { setQuery(e.target.value); searchUsers(); }}
            label="Search"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onKeyPress={handleKeyPress}
          />
        )}
      />
    </>
  )
}



export default Search