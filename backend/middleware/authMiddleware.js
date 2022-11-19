const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../model/userModel');

const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.userId = decoded.id;
            next();
        } catch (error) {
            console.log(error);
            res.status(401)  //not authorized
            throw new Error('Unauthorized');
        }
    }

    if (!token) {
        res.status(401) 
        throw new Error('No token');
    }
})

module.exports = protect;