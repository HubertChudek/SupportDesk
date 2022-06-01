const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000

//Connect to databse
connectDB()

//Initialize Express application
const app = express()

//Middleware config - parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Root response
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Support the Desk API!' })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

//Middleware config - errors handling
app.use(errorHandler)

//Listening port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
