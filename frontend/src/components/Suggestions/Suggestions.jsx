import React from 'react'
import './Suggestions.scss'
import { FollowersData } from '../PostData'

const Suggestions = () => {
    return (
        <div className='Suggestions'>
            <div className='header'>
                <h5>Suggestions for you</h5>
                <p>See all</p>
            </div>

            <div>
                {
                    FollowersData.map((follower, id) => {
                        return (
                            <div className="follower">
                                <div className="">
                                    <img src={follower.img} alt="" className='followerImg'/>
                                    <div className="name">
                                        <span>{follower.name}</span>
                                        <span>{follower.username}</span>
                                    </div>
                                </div>
                                <button>Follow</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Suggestions