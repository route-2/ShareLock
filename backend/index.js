const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.MONGODB_URI;
const routes = require('./routes/routes');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use('/api', routes)

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})