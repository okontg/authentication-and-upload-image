const jwt = require('jsonwebtoken');

const jwt__authorlization__token = (req, res, next)=>{
  const authorlize = req.headers['authorization'];

  //check if the token is a bearer token
  if(!authorlize || !authorlize.startsWith('Bearer')){
    return res.status(401).json({
      success : false,
      message : 'Not a bearer token!'
    })
  }

  //split the token
  const split__token = authorlize && authorlize.split(' ')[1];

  if(!split__token){
    return res.status(401).json({
      success : false,
      message : 'Please provide a token to continue.'
    });
  }

  //decode the token
  try{
    const verify__token = jwt.verify(split__token, process.env.JWT_SECRET_KEY);
    //console.log(verify__token);
    req.userInfo = verify__token;
    
    next();
  }
  catch(e){
    console.log('Wrong token provided');
    return res.status(401).json({
      success : false,
      message : 'Ooops! Token expires.'
    })
  }
}

module.exports = jwt__authorlization__token;