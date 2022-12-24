const express = require('express');
const router = express.Router();

const { newAdmin, adminLogin, adminData, } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, adminData)
    .post(newAdmin);

router.post('/login', adminLogin);



module.exports = router;