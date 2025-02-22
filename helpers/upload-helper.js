//-----------upload an image to cloudinary
const Cloudinary = require('../config/connect-cloudinary');

const image_uploader = async(filePath)=>{
  try{
    const load_image = Cloudinary.uploader.upload(filePath);
    return {
      url : load_image.secure_url,
      publicId : load_image.public_id
    }
  }
  catch(error){
    console.error('Can not upload the image to cloudinary', error);
    throw new Error('Failed to upload the iamge to cloudinary.')
  }
}

module.exports = image_uploader;