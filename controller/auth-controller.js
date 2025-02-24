const User = require('../models/schema');
const bcrypt_js = require('bcryptjs');
const jwt = require('jsonwebtoken');


//register controller
const registerUser = async(req,res)=>{
  try{
    //get the user details for the models folder
    const {username, email, password, role} = req.body;

    //check if the user existed in out database. check for existing user
    const unique__user = await User.findOne({$or : [{username}, {email}]});
    if(unique__user){
      res.status(400).json({
        success : false,
        message : 'This user already existed, please try with another email or user name.'
      })
    }

    // encrbpt the pass word
    const salt = await bcrypt_js.genSalt(10); //maximum password to 10 number
    const hash__password = await bcrypt_js.hash(password, salt);

    //create a new user
    const newUser = new User({
      username,
      email,
      password : hash__password,
      role : role || 'user'
    });

    await newUser.save();

    if(newUser){
      res.status(200).json({
        success : true,
        message : 'New user has been created successfully!'
      });
    }
    else{
      res.status(400).json({
        success : false,
        message : 'Unable to register user. Please try again!'
      })
    }

      

  }
  catch(error){
    console.log('failed to register');
    res.status(401).json({
      success : false,
      message : 'Failed to register. Please try again later!'
    });
  }
}


//logic user
const loggingUser = async (req, res)=>{
  try{
    const {username, password} = req.body;
    const getD__current__user = await User.findOne({username});

    //check if the user is not in the database
    if(!getD__current__user){
      res.status(400).json({
        success : false,
        message : 'Invalid user credentials'
      })
    }

    //check if the password matches
    const check__password__matched = bcrypt_js.compare(password, getD__current__user.password);

    //if password not matched
    if(!check__password__matched){
      res.status(400).json({
        success : false,
        message : 'Incorrect password'
      })
    }

    //else create a token
    const create__token = jwt.sign(
      {
        username : getD__current__user.username,
        userId : getD__current__user._id,
        role : getD__current__user.role
      },process.env.JWT_SECRET_KEY,{
        expiresIn : '30m'
      }
    )

    //if the user details is correct
    res.status(200).json({
      success : true,
      message : 'Logged in successfully!',
      create__token
    });
    

  }
  catch(error){
    console.log('Unable to login now', error);
    res.status(400).json({
      success : false,
      message : 'Invalid token.'
    });
  }
}

//change password
const change_password = async(req, res)=>{
  try{
    const user_id = req.userInfo.userId;
    const {old_password, new_password} = req.body;
    //current user
    const current_user = await User.findById(user_id);
    if(!current_user){
      res.status(404).json({
        success : false,
        message : 'Login to change the password.'
      });
    }
    //compare the old the old password with the current password
    const isPassword_matched = await bcrypt_js.compare(old_password, current_user.password);
    if(!isPassword_matched){
      res.status(401).json({
        success : false,
        message : 'Incorrect password'
      })
    }

    //hash the password
    const salt = await bcrypt_js.genSalt(10);
    const newly_password = await bcrypt_js.hash(new_password, salt);
    
    //update password
    current_user.password = newly_password;
    await current_user.save();

    res.status(201).json({
      success : false,
      message : 'Password updated successfully.'
    });

  }
  catch(error){
    console.log(`user not found, can't change the password ${error}`);
    res.status(404).json({
      success : false,
      message : 'Not authorize! You can not change this password.'
    })
  }
}

module.exports = {registerUser, loggingUser, change_password}