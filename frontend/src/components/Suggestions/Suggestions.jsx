import React from 'react'
import './Suggestions.scss'
import { useEffect } from 'react'
import { API_USER } from '../../axios'
import { useState } from 'react'
import { Avatar } from '@mui/material'

const Suggestions = () => {

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await API_USER.get('/suggestions')
                if (response.data.status === 'success') {
                    setSuggestions(response.data.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    const followUser = async (id) => {
        try {
            // const response = await API_USER.put('/',{id});
            console.log('response');
        } catch (error) {

        }
    }

    return (

        
        <div className='Suggestions'>
            <div className='header'>
                <h5>Suggestions for you</h5>
                <p>See all</p>
            </div>

            <div>
                {
                    suggestions.map((suggestion) => {
                        return (
                            <div className="follower" key={suggestion?.id}>
                                <div className="">
                                    <Avatar src={suggestion?.profilePic}/>
                                    <div className="name">
                                        <span>{suggestion?.name}</span>
                                        <span>{suggestion?.username}</span>
                                    </div>
                                </div>
                                <button onClick={()=>followUser(suggestion?._id)}>Follow</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Suggestions