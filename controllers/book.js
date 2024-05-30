const Book = require('../models/Book');
const fs = require('fs');
 
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
        .then(() => { res.status(201).json({ message: 'Livre enregistré.'})})
        .catch(error => { res.status(400).json({ error })});
};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message: 'Non-autorisé.'})
            } else {
                if (req.file && book.imageUrl) {
                    const oldImagePath = book.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${oldImagePath}`, (err) => {
                        if (err) {
                            return res.status(500).json({ message: 'Erreur lors de la suppression de l\'ancienne image.' });
                        } else {
                            console.log('Ancienne image supprimée avec succès');
                        }
                    });
                }
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                    .then(() => res.status(200).json({ message: 'Livre modifié.'}))
                    .catch(error => res.status(401).json({ error }))
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({message: 'Non-autorisé.'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({ message: 'Livre supprimé.'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        })
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.getThreeBestRatedBooks = (req, res, next) => {
    Book.find().sort({ averageRating: -1}).limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

exports.rateBook = (req, res, next) => {
    const userId = req.auth.userId;
    const { rating } = req.body;

    Book.findOne({ _id: req.params.id })
        .then(book => {
            const existingRating = book.ratings.find(rating => rating.userId === userId);
            if (existingRating) {
                return res.status(403).json({ message: 'Non-autorisé. Vous ne pouvez pas modifier votre note.' });
            }

            book.ratings.push({ userId, grade: rating });

            const totalGrades = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
            const averageRating = totalGrades / book.ratings.length;

            book.averageRating = averageRating;

            return book.save();
        })
        .then(updatedBook => {
            res.status(200).json(updatedBook);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};