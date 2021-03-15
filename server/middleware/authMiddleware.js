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
				return user
			} catch (err) {
				throw new AuthenticationError('Invalid/Expired token')
			}
		}
		throw new Error("Authentication token must be 'Bearer [token]'")
	}
	throw new Error('Authorization header must be provided')
}
