const createError = require('http-errors');
const mongoose = require('mongoose');
const Request = require('../models/request.model');
const User = require('../models/user.model');
const upload = multer({ dest: './public/uploads/' });

module.exports.create = (upload.single('attachment'), function (req, res, next) {
    
   const uploadDoc = new UploadDoc({
       
   })

})