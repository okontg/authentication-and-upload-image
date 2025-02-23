const express = require('express');
const authorization = require('../middlewares/auth-authentication');
const admin_only = require('../middlewares/admin-middleware');
const multer = require('../middlewares/upload-image');
const {upload_image_cloud} = require('../controller/image-controller');

const router = express.Router();

//create route
router.post('/upload', 
  authorization,
  admin_only,
  multer.single('image'),
  upload_image_cloud
)

module.exports = router;
