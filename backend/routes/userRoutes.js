const express = require('express');
const { getUser, setUser } = require('../controllers/userController');
const router = express.Router();



router.route('/').get(getUser).post(setUser);

router.put('/:id',(req,res)=>{
    res.status(200).json({message: 'update goal'})
});

router.delete('/:id',(req,res)=>{
    res.status(200).json({message: 'Delete goals'})
});








module.exports = router;