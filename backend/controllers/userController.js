const asyncHandler = require('express-async-handler');

//@desc Get user
//@route GET /api/v1/user
//@access private
const getUser = asyncHandler(async (req,res)=>{
    res.status(200).json({message: 'Get goals'})
})

//@desc Set user
//@route POST /api/v1/user
//@access private
const setUser = asyncHandler(async (req,res)=>{
    console.log(req.body);
    if(!req.body.name){
        throw new Error('Please add fields')
    }
})

module.exports = {
    getUser, 
    setUser,
}