const express = require('express')
const morgan = require('morgan')

// import routes
const usersRoutes = require('./routes/users')

// import db
const sequelize = require('./config/db');
require('./models/init'); // Init the models

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express()

// Settings

app.set('appName', 'My first express app') // Custom name for the app
app.set('port', process.env.PORT || 3000) // Port for the app
app.set('case sensitive routing', true) // Case sensitive routing, this is a reserved word

// Middlewares
app.use(express.json()) // Middleware to accept json data
app.use(morgan('dev')) // Middleware to show the requests in the console

// Auth middleware
app.use((req, res, next) => {

    console.log('Auth middleware', req.query.user)
    
    if (req.query.user === 'admin') {
        console.log('Authorized')
        next()
        
    } else {
        res
        .status(401)
        .json({
                error: 'Unauthorized',
            })
    }
})

// Routes
app.use(usersRoutes)

// When the route is not found
app.use((req, res) => {
    res
    .status(404)
    .send({
        error: 'Page not found',
    })
})

app.listen(app.get('port'))
console.log(`Server ${app.get('appName')} on port ${app.get('port')}`)