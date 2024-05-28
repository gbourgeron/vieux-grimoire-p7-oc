const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://gbourgeron:zEEqGZBKC6L4FoxR@cluster0.fyf4qd8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});

app.post('/api/books', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Livre créé'
    });
})

app.get('/api/books', (req, res, next) => {
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