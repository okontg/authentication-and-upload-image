//-----------upload an image to cloudinary
const Cloudinary = require('../config/connect-cloudinary');

const image_uploader = async(filePath)=>{
  try{
    const image_details = await Cloudinary.uploader.upload(filePath);
    return {
      url : image_details.secure_url,
      publicId : image_details.public_id
    };
  }
  catch(error){
    console.error('Can not upload the image to cloudinary', error);
    throw new Error('Failed to upload the image to cloudinary.')
  }
}

module.exports = {
  image_uploader
}