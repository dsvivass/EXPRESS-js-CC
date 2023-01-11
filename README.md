# Building a Basic RESTful API with Express.js
- [Building a Basic RESTful API with Express.js](#building-a-basic-restful-api-with-expressjs)
  - [Install](#install)
  - [Basic server](#basic-server)
  - [Connect to MySQL](#connect-to-mysql)
  - [Run the server](#run-the-server)
  - [Nodemon](#nodemon)
  - [Not found route](#not-found-route)
  - [Use JSON](#use-json)
  - [Middleware](#middleware)
    - [Morgan](#morgan)
    - [Helmet](#helmet)
  - [Settings](#settings)
    - [Custom settings](#custom-settings)
    - [Express settings](#express-settings)

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

## Connect to MySQL

To connect to a MySQL DB we have to install the following packages:

```bash
    npm install --save sequelize mysql2
```

Then, use the next code in a new file called `config/db.js`:

```javascript
    require('dotenv').config();
    const Sequelize = require('sequelize');

    const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    });

    module.exports = sequelize;
```

Finally, import the db into the files where we are going to use db. (We can test it in the main file)

```javascript
    const sequelize = require('./config/db');

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
```

## Run the server

To run the server you can use the following command:

```bash
    node server.js
```

## Nodemon

Nodemon is a tool that automatically restarts the server when you make changes to the code.

To install Nodemon you can use the following command:

```bash
    npm install nodemon
```

To run the server using Nodemon you can use the following command:

```bash
    nodemon server.js
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

> 💡 Tip: We can use middlewares to validate the request, log the request, verify that a user is logged in, verify that a user has permissions, etc.

### Morgan 

Morgan is a middleware that logs the requests to the console.

To install Morgan you can use the following command:

```bash
    npm install morgan
```

To use Morgan you can use the following code:

```javascript
    const morgan = require('morgan')
    // Use Morgan
    app.use(morgan())
```

> ❔ [More info](https://www.npmjs.com/package/morgan)

### Helmet

Helmet is a middleware that helps you secure your Express apps by setting various HTTP headers.

To install Helmet you can use the following command:

```bash
    npm install helmet
```

To use Helmet you can use the following code:

```javascript
    const helmet = require('helmet')
    // Use Helmet
    app.use(helmet())
```

## Settings

### Custom settings

To set the port you can use the following code:

> ⚠️ Note: This code must be placed before the routes

> ⚠️ Note: We can set any setting we want and we can use any word

```javascript
    // Set the port
    app.set('port', process.env.PORT || 3000)
```

To get the port you can use the following code:

```javascript
    // Get the port
    app.get('port')
```

These are the most common settings:

- `env`: The environment in which the app is running. It is set to `process.env.NODE_ENV` or `development` if it is not set.
- `port`: The port in which the app is running. It is set to `process.env.PORT` or `3000` if it is not set.
- `views`: The directory where the views are located. It is set to `./views` if it is not set.
- ...

### Express settings

These are some the default settings:

- `case sensitive routing`: `false`
- `etag`: `weak`
- `json escape`: `true`

if we want to change the default settings we can use the following code:

```javascript
    // Set the settings
    app.set('case sensitive routing', true)
```