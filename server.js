const express = require('express')

const app = express()

app.listen(3000)
app.use(express.json())

app.use((req, res, next) => {
    console.log('Middleware 1')
    next()
})

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World',
    })
})

// Params

app.get('/greeting/:user', (req, res) => {
    const { user } = req.params
    res.json({
        message: `Hello ${user}`,
    })
})

// Query,
// is often used with paginations, example: /products?page=2&limit=10

app.get('/greeting', (req, res) => {
    console.log(req.query)

    res.json({
        message: `Hello ${req.query.user}`,
    })
})

app.post('/product', (req, res) => {
    console.log(req.body)

    res.status(201).json({
        message: 'Product created',
        product: req.body,
    })
})

app.get('/isAlive', (req, res) => {
    res.sendStatus(204)
})

// When the route is not found
app.use((req, res) => {
    res
        .status(404)
        .send({
            error: 'Page not found',
        })
})

console.log('Server on port 3000')