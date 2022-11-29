const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        console.log(req.body);
        let ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
            cb(new Error('Unsupported file type!'), false);
            return;
        }
        cb(null,true);
    },
});