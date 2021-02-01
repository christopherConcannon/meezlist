import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config({path:  '../.env'})

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// need to mimic default path __dirname behavior since it is not available with es modules syntax
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const PORT = process.env.PORT || 3001;


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
