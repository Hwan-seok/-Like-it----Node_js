
const multer = require('multer');
module.exports=multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/images/');
      },
      filename: function (req, file, cb) { //원래 이름으로 파일 저장
        cb(null, file.originalname);
      }
    }),
  });