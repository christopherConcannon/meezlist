import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import routes from './routes/index.js'

dotenv.config({ path: '../.env' })

connectDB()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)

// CUSTOM ERROR HANDLING MIDDLEWARE USED IN CONJUNCTION WITH EXPRESS ASYNC HANDLER IN ROUTE CONTROLLERS
app.use(notFound)

// for error middleware
app.use(errorHandler)

// need to mimic default path __dirname behavior since it is not available with es modules syntax
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is running')
	})
}

const PORT = process.env.PORT || 3001

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
