import React from 'react'
import './Suggestions.scss'
import { useEffect } from 'react'
import { API_USER } from '../../axios'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../redux/auth/userSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Suggestions = () => {

    const navigate = useNavigate()
    const [suggestions, setSuggestions] = useState([]);
    const { user } = useSelector(state => state.userData);
    const dispatch = useDispatch()
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
            const response = await API_USER.patch(`/follow`,{toBeFollowedId: id, activeUserId: user?._id});
            dispatch(setUser(response.data.activeUser));
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const unfollowUser = async (id) => {
        try {
            // const response = await API_USER.put('/',{id});
            const response = await API_USER.patch(`/unfollow`,{toBeUnfollowedId: id, activeUserId: user?._id});
            dispatch(setUser(response.data.activeUser));
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
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
                            <div className="follower" key={suggestion?._id}>
                                <div className="">
                                    <Avatar src={suggestion?.profilePic} />
                                    <div className="name" onClick={()=>navigate(`/profile/${suggestion?.username}`)}>
                                        <span>{suggestion?.name}</span>
                                        <span>{suggestion?.username}</span>
                                    </div>
                                </div>

                                {
                                    user?.following.includes(suggestion._id) ?
                                        <button onClick={() => unfollowUser(suggestion._id)} style={{ backgroundColor: 'white' }}>following</button>
                                        :
                                        <button onClick={() => followUser(suggestion._id)}>follow</button>
                                }

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Suggestions