const express = require('express');
const authorlize__user = require('../middlewares/auth-authentication');
const router = express.Router();

router.get('/welcome', authorlize__user, (req,res)=>{
  const {username, userId, role} = req.userInfo;

  res.json({
    message : 'Welcome to the home page!',

    user : {
       _id : userId,
       username,
       role
    }
  });
});

module.exports = router;