// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient


const connectionURL = 'mongodb://127.0.0.1:27017'
const collectionName = 'task-manager'


// establishing connection to database
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) =>{
    if(error) {
        return console.log('Unable to connect to database')
    }

    // connecting to the collection
    const db = client.db(collectionName)

    // inserting into the collection
    db.collection('users').insertOne({
        name: 'Min',
        age: 27
    })
})