const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const compressImage = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Aucune image à compresser' });
    }

    const bookData = JSON.parse(req.body.book);

    const bookTitle = bookData.title;
    const sanitizedTitle = bookTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    sharp(req.file.buffer)
        .resize({ height: 800, withoutEnlargement: true })
        .webp({ quality: 65 })
        .toBuffer()
        .then((buffer) => {
            const timestamp = Date.now();
            const imageFileName = `${sanitizedTitle}_${timestamp}.webp`;
            
            const imagePath = path.resolve(__dirname, '..', 'images', imageFileName);
            console.log('Chemin de sauvegarde de l\'image compressée:', imagePath);

            fs.writeFileSync(imagePath, buffer);
            req.file.filename = imageFileName;
            console.log('Image compressée avec succès');
            next();
        })
        .catch((err) => {
            console.error('Erreur lors de la compression de l\'image :', err);
            return res.status(500).json({ error: 'Erreur lors de la compression de l\'image' });
        });
};

module.exports = compressImage;
