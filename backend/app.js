const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./db/connectDB')
const fileUpload = require('express-fileupload')
const API = require('./routes/api')
const cookieParser = require('cookie-parser')
const cors = require('cors')




app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

dotenv.config({
    path: '.env'
})

app.use(cookieParser())

app.use('/api', API)

connectDB()



app.listen(process.env.PORT, () => {
    console.log(`localhost: ${process.env.PORT}`);
})