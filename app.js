const express = require('express')
const session = require('express-session')
const dotenv = require('dotenv').config()
const handlebars = require('express-handlebars')
const router = require('./routes/router')
const app = express()

// set middlewares

app.use(express.static('public'))
app.use(require('body-parser').urlencoded({ extended: false }));

//set view engine
app.engine('handlebars',handlebars())
app.set("view engine","handlebars")

app.use('/',router)

app.listen(3000,()=>console.log('server started'))