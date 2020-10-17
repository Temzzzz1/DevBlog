const { Router } = require('express')
const router = Router()
const PortfolioController = require('./PortfolioController')


router.get('/portfolio', PortfolioController.showPosts)

module.exports = router;