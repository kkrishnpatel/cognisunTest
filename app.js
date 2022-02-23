const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/testApi";
var cors = require('cors')

mongoose.connect(mongoUrl);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/api', routes)

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = {
  app
}