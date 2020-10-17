require('dotenv').config()

const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const exphbs = require('express-handlebars')

const hbs = exphbs.create({
    helpers: {
        times: (n, block) => {
            var accum = '';
            for(var i = 1; i <= n; ++i) {
                block.data.index = i;
                accum += block.fn(this);
            }
            return accum;
        }
    },
    layoutsDir: "views/layouts",
    defaultLayout: 'blog',
    extname: 'hbs'
})



const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'resources')))




// Routes
const blogRoute = require('./src/Blog/BlogRoute')
const portfolioRoute = require('./src/Portfolio/PortfolioRoute')

app.use(blogRoute)
app.use(portfolioRoute)

async function start() {
    try {
        // Connect to MongoDB
        await mongoose.connect(
            'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@cluster0.hmrgl.mongodb.net/'+process.env.DB_NAME, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }).then(console.log('Database connected...'))
        .catch('Cannot connect to DB')

        // Start server
        app.listen(PORT, () => {
            console.log('Server has been started...');
        })

    } catch (e) {
        console.log(e)
    }
}

start()