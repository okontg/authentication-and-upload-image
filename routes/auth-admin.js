const express = require('express');
const AUTHENTICATE_USERS = require('../middlewares/auth-authentication');
const ADMIN_USERS = require('../middlewares/admin-middleware');

const ROUTER = express.Router();

ROUTER.get('/welcome', AUTHENTICATE_USERS, ADMIN_USERS, (req, res)=>{
  res.status(200).json({
    success : true,
    message : 'Welcome to your admin page.'
  });
});

module.exports = ROUTER;
