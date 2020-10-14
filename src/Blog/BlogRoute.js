
const { Router } = require('express');
const router = Router();
const Blog = require('./BlogModel');

// router.get('/', async (req, res) => {
//     const blog = await Blog.find().lean()   
//     let pageCount = Math.ceil(blog.length / 5)
//     if (pageCount <= 1) pageCount = 0
//     res.render('blog', {
//         title: 'Rusanov | Blog',
//         blog: blog.slice(0, 5),
//         pageCount
//     })
// })


router.get('/:page?', async (req, res) => {
    const blog = await Blog.find().lean()   
    let pageCount = Math.ceil(blog.length / 5)
    if (pageCount <= 1) pageCount = 0

    if (req.params.page <= 0 || req.params.page > pageCount) res.redirect('/')
    if (!req.params.page) req.params.page = 1
    const firstPost = (5 * (req.params.page - 1))
    const secondPost = firstPost + 5
    res.render('blog', {
        title: 'Rusanov | Blog',
        blog: blog.slice(firstPost, secondPost),
        pageCount
    })
})

router.get('/post:id', async (req, res) => {
    const postsCount = await Blog.find().estimatedDocumentCount()
    const randomPosts = await Blog.find({}, {}, {
        skip: Math.random() * Math.floor(postsCount),
        limit: 3
    }).lean()
    const blog = await Blog.findOne({ _id: req.params.id }).lean()   
    res.render('post', {
        title: 'Rusanov | ' + blog.title,
        layout: 'post',
        blog,
        randomPosts
    })
})

module.exports = router;