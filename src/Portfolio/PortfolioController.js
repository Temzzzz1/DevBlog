
module.exports.showPosts = async (req, res) => {

    res.render('portfolio', {
        title: 'Rusanov | Portfolio',
        layout: 'blog'
    })
}