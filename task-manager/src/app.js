const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./db/mongoose')

const app = express()
// Settings
const settings = {
    'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
    'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors(settings));


// create router
// setup what the route will do
// register the route
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
app.use(userRouter)
app.use(taskRouter)


module.exports = app