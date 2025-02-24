const {registerUser, loggingUser, change_password} = require('../controller/auth-controller');
const authentication = require('../middlewares/auth-authentication');
const express = require('express');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loggingUser);
router.post('/change-password',authentication, change_password);

module.exports = router;