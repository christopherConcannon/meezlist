import path from 'path'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import connectDB from './config/db.js'
import cors from 'cors'

import { typeDefs, resolvers } from './graphql/index.js'

import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

connectDB()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// not sure? but fixes error
// Access to fetch at 'http://localhost:3001/' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
app.use(cors())

const server = new ApolloServer({
	typeDefs,
  resolvers,
  // forward request to all queries for access to headers for authentication and subscription
  context: ({ req }) => ({ req })
})

server.applyMiddleware({ app })

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


const PORT = process.env.port || 3001

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
