const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')

// routes
const homeRouter = require('./routes/home')
const carsRouter = require('./routes/cars')
const cardRouter = require('./routes/card')
const addRouter = require('./routes/add')

// public ulash jarayoni
app.use(express.static(path.join(__dirname, 'public')))

// post metodni registratsiya qilish
app.use(express.urlencoded({extended: true}))

// hbs ulash jarayoni
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use('/', homeRouter)
app.use('/cars', carsRouter)
app.use('/card', cardRouter)
app.use('/add', addRouter)


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express working on ${port} port`);
})