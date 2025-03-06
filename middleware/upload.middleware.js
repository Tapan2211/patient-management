const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({  // Change `.storage` to `.diskStorage`
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save images in "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

module.exports = upload;
