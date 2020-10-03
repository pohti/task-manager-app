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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// create router
// setup what the route will do
// register the route
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
app.use(userRouter)
app.use(taskRouter)

app.get('/', (req, res) => {
    res.send('Hello from task manager backend')
})

module.exports = app