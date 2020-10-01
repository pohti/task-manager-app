const mongoose = require('mongoose')
const validator = require('validator')

// establishing connection to database
const endpoint = process.env.MONGODB_URL


mongoose.connect(endpoint, {
    useNewUrlParser: 'true',
    useCreateIndex: true,
    useFindAndModify: false
})



