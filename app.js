const express = require('express');

const app = express();

app.use('/api/books', (req, res, next) => {
    const book = [
        {
            _id: 'oeihfzeoi',
            title: 'Star Wars Episode IV: A New Hope',
            author: 'George Lucas',
            imageUrl: 'https://static.wikia.nocookie.net/starwars/images/3/3a/FromtheAdventuresofLukeSkywalker.png/revision/latest?cb=20190926173352',
            year: 1976,
            price: 4900,
            genre: 'Sci-Fi',
            rating: 4,
            userId: 'gsomihvgios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Star Wars Episode V: The Empire Strikes Back',
            author: 'George Lucas',
            imageUrl: 'https://static.wikia.nocookie.net/starwars/images/8/80/Episodev_empirestrikesback.jpg/revision/latest?cb=20210409185847',
            year: 1980,
            price: 2900,
            genre: 'Sci-Fi',
            rating: 4,
            userId: 'gsomihvgios',
        },
    ];
    res.status(200).json(book);
});

module.exports = app;