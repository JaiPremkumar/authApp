const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

const auth = require('./router')

app.use('/api/v1/',auth)


module.exports = app;