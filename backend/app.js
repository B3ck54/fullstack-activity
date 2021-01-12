const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const Product = require ('./models/Product')

mongoose.connect('mongodb+srv://root:<password>@cluster0.l3xmz.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader
    next();
  });

app.use(bodyParser.json());

//Create a product
app.post('/api/products', (req, res, next) => {
    delete req.body._id
    const product = new Product({
        ...req.body
    // name: 'Produit test',
    // description: 'ceci est une description',
    // price: 44,
    // inStock: 1,
    // "__v": 0
});
product.save()
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error }));
});

//Find all products
app.get('/api/products', (req, res, next) => {
    Product.find()
    .then(products => res.status(200).json({ products }))
    .catch(error => res.status(400).json({ error}));
});

// Find  by one product
app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({'_id': req.params.id})
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error}));
});


//Update product
app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(product => res.status(200).json({product}))
    .catch(error => res.status(400).json({ error }));
});

//Delete product
app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Produit supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});  

module.exports = app;
