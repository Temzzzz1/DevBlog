const { Router } = require('express')
const router = Router()



const BlogController = require('./BlogController')

router.get('/', BlogController.loadMainPage)

router.post('/', BlogController.searchPosts)

router.get('/page=:pageID', BlogController.loadPage)

router.get('/post:id', BlogController.loadPost)

module.exports = router;