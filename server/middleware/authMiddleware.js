import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

import { AuthenticationError } from 'apollo-server-express'

export const checkAuth = async (context) => {
	// context = { ... headers}
	const authHeader = context.req.headers.authorization
	if (authHeader) {
		// Bearer <token>
		const token = authHeader.split('Bearer ')[1]
		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET)
				const user = await User.findById(decoded.id).select('-password')
        console.log('user', user);
				return user
			} catch (err) {
				throw new AuthenticationError('Invalid/Expired token')
			}
		}
		throw new Error("Authentication token must be 'Bearer [token]'")
	}
	throw new Error('Authorization header must be provided')
}

// // add this to any route you want to restrict
// const protect = async (req, res, next) => {
// 	let token
// 	// console.log(req.headers.authorization)

// 	// https://www.w3schools.com/jsref/jsref_startswith.asp
// 	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// 		// console.log('token found')
// 		try {
// 			// token will be after the space following 'Bearer ' so use .split()[1]
//       token = req.headers.authorization.split(' ')[1]
//       // verify the token sent by client is valid.  if so the parsed response will include the id of the user which was used to generate the token on register/login
// 			const decoded = jwt.verify(token, process.env.JWT_SECRET)

// 			// user's id will be in decoded.id.  we can assign a new property on req (req.user) and store the user that comes back from the db (excluding the password).  we will now have access to the req.user in all of the protected routes
// 			req.user = await User.findById(decoded.id).select('-password')

// 			next()
// 		} catch (error) {
// 			console.error(error)
// 			res.status(401)
// 			throw new Error('Not authorized, token failed')
// 		}
// 	}

// 	if (!token) {
// 		res.status(404)
// 		throw new Error('Not authorized, no token')
// 	}
// }

// export { protect }
