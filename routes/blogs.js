const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();
const img = require('../controller/imgUploader')
router.post('/', async (req, res) => {
    
    if(req.body.imagen && req.body.content && req.body.title){
       
        try {
            var imgUrl = await img.upload(req.body.imagen)
            console.log(imgUrl)
            var blogSchemaBody = {
                title:req.body.title,
                content:req.body.content,
                imagen:imgUrl
            }
            const blog = new Blog(blogSchemaBody);
            await blog.save();
            res.status(201).send(blog);
        } catch (error) {
            res.status(400).send(error);
        }
    } else{
        res.status(500).json({
            "error":"value/s is/are missing!"
        })
    }
    
});

// Obtener todos los blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener un blog por ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Actualizar un blog por ID
router.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!blog) {
            return res.status(404).send();
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar un blog por ID
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
