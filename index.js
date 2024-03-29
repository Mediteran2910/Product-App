const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product') 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.get('/products', async (req, res) =>{
    const products = await Product.find({});
    res.render('products/index.ejs', { products })
})

app.get('/products/:id', async (req, res) =>{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show.ejs', { product })
})

app.get('/products/new', (req,res)=>{
    res.render('products/new.ejs')
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})
