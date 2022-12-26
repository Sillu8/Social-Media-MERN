const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Admin = require('../model/adminModel');
const User = require('../model/userModel');


//@desc Create new Admin
//@route api/v1/admin
//@access Public
const newAdmin = asyncHandler(async (req, res) => {


    const { name, email, phone, password } = req.body;

    const emailExists = await Admin.findOne({ email });

    if (emailExists) {
        res.status(400);
        throw new Error('An admin with this email already exists!')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
        name, email, phone, password: hashedPwd
    })


    if (admin) {
        res.status(201).json({
            status: 'success',
            data: {
                name: admin.name,
                email: admin.email
            }
        })
    } else {
        res.status(400);
        throw new Error('Invalid admin data!')
    }

})



//@desc Admin Data
//@route GET /api/v1/admin
//@access Private
const adminData = asyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ _id: req.userId });
    res.status(200).json({
        status: 'success',
        data: {
            admin
        }
    })
})




//@desc Authenticate admin
//@route POST /api/v1/admin/login
//@access Public
const adminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if ((!email) || !password) {
        res.status(400);
        throw new Error('Please enter all the fields.')
    }

    const admin = await Admin.findOne({ email }).select('+password');
    if (admin && await bcrypt.compare(password, admin.password)) {
        res.status(200).json({
            status: 'success',
            data: {
                _id: admin._id,
                name: admin.name,
                adminToken: generateToken(admin._id)
            }
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials!')
    }

})



//@desc Get users data
//@route GET /api/v1/admin/users
//@access Private
const getUsersData = asyncHandler(async (req, res) => {

    const users = await User.aggregate([
        {
            $project: {
                id: "$_id",
                name: 1,
                email: 1,
                isBlocked: 1,
                phone: 1,
                _id: 0
            }
        }
    ])

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
})




//@desc Block or unblock user
//@route GET /api/v1/admin/:userId/block
//@access Private
const changeUserStatus = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { isBlocked } = req.body;
    
    const newStatus = isBlocked ? false : true


    const user = await User.findByIdAndUpdate(userId, {
        isBlocked: newStatus
    }, {new: true});

    res.status(200).json({
        status: 'success',
        message: 'Successfully changed status.',
        user
    })


})




const generateToken = (id) => {
    token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}


module.exports = {
    newAdmin,
    adminData,
    adminLogin,
    getUsersData,
    changeUserStatus,
}