const image_schema = require('../models/image-schema');
const {image_uploader} = require('../helpers/upload-helper');
const file_path = require('fs');
const cloudinary = require('../config/connect-cloudinary');

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
    file_path.unlinkSync(req.file.path);

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

//fetch the images
const fetch_image = async(req, res)=>{
  try{
    //pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page -1) * limit;

    //sorting
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const totalImages = await image_schema.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sorting = {};
    sorting[sortBy] = sortOrder;

    const Images = await image_schema.find().sort(sorting).skip(skip).limit(limit);
    if(Images){
      res.status(200).json({
        success : true,
        currentPage : page,
        totalImages : totalImages,
        totalPages : totalPages,
        data : Images
      })
    }

  }
  catch(error){
    console.log('can get the images', error);
    res.status(401).json({
      success : false,
      message : 'Access failed! Please try again.'
    })
  }
}

//delete image from cloudinary
const delete_image = async(req, res)=>{
  try{
    const current_user = req.params.id;
    const user_id = req.userInfo.userId
    const find_current_user = await image_schema.findById(current_user);

    //check for the currect user id
    if(!find_current_user){
      res.status(404).json({
        success : false,
        message : 'User not found!'
      })
    }

    //check if this user was the one that uploaded the image
    if(find_current_user.uploadedBy.toString() !== user_id){
      res.status(403).json({
        success : false,
        message : 'Not authorize! You can not delete this image.'
      })
    }

    //first delete from cloudinary
    await cloudinary.uploader.destroy(find_current_user.publicId);

    //delete from mongodb database
    await image_schema.findByIdAndUpdate(current_user);

    res.status(200).json({
      success : true,
      message : 'Image deleted successfully.'
    })

  }

  catch(error){
    console.log('can not delete this image', error);
    res.status(500).json({
      success : false,
      message : 'Can not delete the image! Please try again later.'
    })
  }
}

module.exports = {
  upload_image_cloud, 
  fetch_image, 
  delete_image
};
