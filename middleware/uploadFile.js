const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './front-end/public/symptom/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).array('file');
module.exports = upload;
