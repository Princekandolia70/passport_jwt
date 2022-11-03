const multer = require("multer");
const fs = require("fs");
const path = require("path");


const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = path.join(__dirname, "..", "public");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
}


const upload = {
  blogStorage,
  fileFilter,
};

module.exports = upload;
