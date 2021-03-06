const express = require ('express')
const cors = require('cors')
const path = require('path')
const app = express()
const settings = {
    'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
    'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(settings));


const clientPath = path.join(__dirname + '/../client')
const homePagePath = path.join(__dirname + '/../client/index.html')
const createAccountPath = path.join(__dirname + '/../client/createAccount.html')


// declaring path to serve static html page
app.use(express.static(clientPath))
// serving html front end page
app.get('/', (req, res) => {
    res.sendFile(homePagePath)
})
app.get('/createaccount', (req,res) => {
    res.sendFile(createAccountPath)
})

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log('Frontend server is up on port: ' + port)
})