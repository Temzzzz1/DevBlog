const MiniSearch = require('minisearch')
const Blog = require('./BlogModel');

module.exports.loadMainPage = async (req, res) => {
    const blog = await Blog.find().lean()   

    let pageCount = Math.ceil(blog.length / 5)
    if (pageCount <= 1) pageCount = 0
    res.render('blog', {
        title: 'Rusanov | Blog',
        blog: blog.slice(0, 5),
        pageCount
    })
}

module.exports.searchPosts = async (req, res) => {
    const blog = await Blog.find().lean()

    const miniSearch = new MiniSearch({
        fields: ['title', 'subtitle'], // fields to index for full-text search
        storeFields: ['_id', 'title', 'subtitle', 'text'], // fields to return with search results
        idField: '_id'
      })

    miniSearch.addAll(blog)
    const result = miniSearch.search(req.body.search)
    let pageCount = Math.ceil(blog.length / 5)
    if (pageCount <= 1) pageCount = 0

    res.render('blog', {
        title: 'Rusanov | Blog',
        blog: result.slice(0, 5),
        pageCount,
        isSearch: true
    })
}

module.exports.loadPage = async (req, res) => {
    const blog = await Blog.find().lean()   
    let pageCount = Math.ceil(blog.length / 5)
    if (pageCount <= 1) pageCount = 0

    if (req.params.pageID <= 0 || req.params.pageID > pageCount) {
        return res.redirect('/')
    }
    
    if (!req.params.pageID) req.params.pageID = 1
    const firstPost = (5 * (req.params.pageID - 1))
    const secondPost = firstPost + 5
    res.render('blog', {
        title: 'Rusanov | Blog',
        blog: blog.slice(firstPost, secondPost),
        pageCount
    })
}

module.exports.loadPost = async (req, res) => {
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
}

