const express = require('express');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/book');

mongoose.connect('mongodb+srv://gbourgeron:<PASSWORD>@cluster0.fyf4qd8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});

app.use('/api/books', bookRoutes);

module.exports = app;