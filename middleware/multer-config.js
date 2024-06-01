const multer = require('multer');

const uploadImage = (req, res, next) => {
    const upload = multer({ storage: multer.memoryStorage() }).single('image');
    upload(req, res, (err) => {
        if (err) {
            console.error('Erreur lors de l\'upload de l\'image :', err);
            return res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
        }
        console.log('Image uploadée avec succès');
        next();
    });
};

module.exports = uploadImage;
