
const { Router } = require('express');
const router = Router();
const Blog = require('./BlogModel');

router.get('/', async (req, res) => {
    const blog = await Blog.find().lean()   

    res.render('blog', {
        title: 'Rusanov | Blog',
        blog
    })
})

router.get('/post:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id }).lean()   

    res.render('post', {
        title: 'Rusanov | ' + blog.title,
        layout: 'post',
        blog
    })
})

module.exports = router;