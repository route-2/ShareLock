
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const getShares = require('./routes/shares')

const database = process.env.MONGODB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('connected to DB'))
.catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', getShares);

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server started on port: " + PORT))

