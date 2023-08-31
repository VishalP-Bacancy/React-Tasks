require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user/userRoutes')
const bodyParser = require('body-parser')
const { errorHandler } = require('./util/errorHandler')

const app = express()



app.use(bodyParser.json())


app.use((req, res, next) => { //CORS error setting
    res.setHeader('Access-Control-Allow-Origin', '*'); // It will not send  response, but only set the Header
    res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/user', userRoutes)

app.use(errorHandler)


 
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log(`Database Connected successfully! 😀`)  
      app.listen(process.env.PORT || 5000, () => {
         console.log(`Server is running on port ${process.env.PORT || 5000}`)
      })
    }).catch(err => console.log(err))