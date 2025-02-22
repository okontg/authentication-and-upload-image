const express = require('express');
const authorization = require('../middlewares/auth-authentication');
const admin_only = require('../middlewares/admin-middleware');
const multer = require('../middlewares/upload-image');
const image_controller = require('../controller/image-controller');

const router = express.Router();

//create route
router.post('/upload-image', 
  authorization,
  admin_only,
  multer.single('image'),
  image_controller
);

module.exports = router;
