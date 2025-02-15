const isAdmin__user = (req, res, next)=>{
  if(req.userInfo.role !== 'admin'){
    return res.status(401).json({
      success : false,
      message : 'You can not access this page!'
    })
  }

  next();
}

module.exports = isAdmin__user;