const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dbhywmhew',
  api_key: '187735699843312',
  api_secret: 'hpgn_Isyyr6Gq9aQAg4_fjmYo8U'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, 'my-file-name');
  }
});

const parser = multer({ storage: storage });

module.exports = parser;