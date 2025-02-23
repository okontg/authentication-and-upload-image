const image_schema = require('../models/image-schema');
const {image_uploader} = require('../helpers/upload-helper');
//const file_path = require('fs');
//const cloudinary = require('../config/connect-cloudinary');

const upload_image_cloud = async(req, res)=>{
  try{
    //check if the file is missing
    if(!req.file){
      console.log('this file is not found');
      return res.status(400).json({
        success : false,
        message : 'file not found, Please upload an image.'
      });
    }

    //upload to cloudinary
    const {url, publicId} = await image_uploader(req.file.path);

    //store it to the database/ mongodb
    const image_to_upload = new image_schema({
      url,
      publicId,
      uploadedBy : req.userInfo.userId
    });
    await image_to_upload.save();

    //delete the image from local storage/file
    //file_path.unlinkSync(req.file.path);

    res.status(202).json({
      success : true,
      message : 'Image uploaded successfully to cloudinary',
      image : image_to_upload
    });
  }
  catch(error){
    console.log('cound not upload the image', error);
    res.status(500).json({
      success : false,
      message : 'Can not upload the image'
    });
  }
};

module.exports = {upload_image_cloud};
