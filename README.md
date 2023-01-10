# Building a Basic RESTful API with Express.js
- [Building a Basic RESTful API with Express.js](#building-a-basic-restful-api-with-expressjs)
  - [Install](#install)
  - [Basic server](#basic-server)
  - [Run the server](#run-the-server)
  - [Not found route](#not-found-route)
  - [Use JSON](#use-json)
  - [Middleware](#middleware)

This tutorial will show you how to build a basic RESTful API using Express.js.

## Install

```bash
    npm install express
```

## Basic server

To create a basic server using express you can use the following code in a new file called `server.js` :

```javascript
    const express = require('express')

    // Create an Express application
    const app = express()

    // Listen to incoming requests on port 3000
    app.listen(3000)

    // Handle GET requests to the root route '/'
    app.get('/', (req, res) => {
        // Send the index.html file located in the static directory as the response
        res.sendFile('./static/index.html', {
            root: __dirname
        })
    })

    console.log('Server on port 3000')

```

## Run the server

To run the server you can use the following command:

```bash
    node server.js
```

## Not found route

To handle requests to routes that don't exist you can use the following code:

```javascript
    // Handle requests to routes that don't exist
    app.use((req, res) => {
        // Send a 404 json message
        res.status(404).json({
            error: 'Not found'
        })
    })
```

## Use JSON

To use JSON in your requests you can use the following code:

> ⚠️ Note: This code must be placed before the routes

```javascript
    // Use JSON in requests
    app.use(express.json())
```

## Middleware

A middleware is a function that is executed before the request reaches the route handler. You can use middlewares to validate the request, log the request, etc.

To use a middleware you can use the following code:

```javascript
    // Middleware
    app.use((req, res, next) => {
        // Log the request
        console.log(`${req.method} ${req.url}`)

        // Continue with the request
        next()
    })
```

> ⚠️ Note: We have to write the middleware at the top of the file, before the routes.