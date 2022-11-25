import postPic1 from '../images/beach.jpg'
import postPic2 from '../images/birds.jpg'

export const PostData = [
    {
        img: postPic1,
        name: 'Beach',
        desc: 'Happy New Year',
        likes: 2000,
        liked: true
    },
    {
        img: postPic2,
        name: 'Birds',
        desc: 'Nice Birds',
        likes: 2122,
        liked: false
    }
]

export const FollowersData = [
    {
        name: 'Shamil',
        username: 'shamil8',
        img: postPic1,
    },
    {
        name: 'Leo Messi',
        username: 'leomessi',
        img: postPic2,
    },
]