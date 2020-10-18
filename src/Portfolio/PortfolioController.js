const Portfolio = require("./PortfolioModel")

module.exports.showPosts = async (req, res) => {

    const posts = await Portfolio.find().lean()

    res.render('portfolio', {
        title: 'Rusanov | Portfolio',
        posts,
        layout: 'blog'
    })
}