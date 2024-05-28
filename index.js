const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cloudinary = require('cloudinary').v2; 
require('dotenv').config()
const blogsRouter = require('./routes/blogs')
const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGOURI, {}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API, 
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
 });

app.use('/api/v1/', blogsRouter);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
