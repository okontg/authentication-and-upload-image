const multer = require('multer');
const path = require('path');

//upload the image to images folder
const multer_store = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, images)
  },
  filename : function(req, file, cb){
    cb(null,
       file.filename + '-' + Date.now() + path.extname(file.originalname)
    )
  }
});

//check if the file is an image
const file_an_image = (req, file, cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }
  else{
    cb(new Error, 'This file is not an image.')
  }
}

//export multer
module.exports({
  storage : multer_store,
  image_filter : file_an_image,
  limit :{
    file_size : 5 * 1024 * 1024 //5gb file size limit
  }
});