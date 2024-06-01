const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const uploadImage = require('../middleware/multer-config');
const compressImage = require('../middleware/sharp');

const bookCtrl = require('../controllers/book');

const handleImageUpload = (req, res, next) => {
    if (req.file) {
        compressImage(req, res, next);
    } else {
        next();
    }
};

router.post('/', auth, uploadImage, compressImage, bookCtrl.createBook);
router.put('/:id', auth, uploadImage, handleImageUpload, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getThreeBestRatedBooks);
router.get('/:id', bookCtrl.getOneBook);
router.post('/:id/rating', auth, bookCtrl.rateBook)

module.exports = router;