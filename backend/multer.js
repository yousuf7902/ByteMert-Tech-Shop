const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "backend/uploads/");
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(".")[0];
        cb(null, filename + "-" + unique + ".png");
    },
});

exports.upload = multer({ storage: storage });
