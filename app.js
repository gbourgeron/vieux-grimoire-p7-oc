const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});

app.use('/api/books', (req, res, next) => {
    const book = [
        {
            _id: 'oeihfzeoi',
            title: 'Star Wars Episode IV: A New Hope',
            author: 'George Lucas',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/StarWarsNovelization.jpg',
            year: 1976,
            genre: 'Science-Fiction',
            ratings: [
                {
                    userId: 'gsomihvgios',
                    grade: 4,
                }
            ],
            averageRating: 4,
            userId: 'gsomihvgios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Star Wars Episode V: The Empire Strikes Back',
            author: 'George Lucas',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/80/Episodev_empirestrikesback.jpg',
            year: 1980,
            genre: 'Science-Fiction',
            ratings: [
                {
                    userId: 'gsomihvgios',
                    grade: 5,
                }
            ],
            averageRating: 5,
            userId: 'gsomihvgios',
        },
    ];
    res.status(200).json(book);
});

module.exports = app;