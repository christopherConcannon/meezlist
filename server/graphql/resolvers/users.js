import { AuthenticationError, UserInputError } from 'apollo-server-express'
import generateToken from '../../utils/generateToken.js'
import { validateRegisterInput, validateLoginInput } from '../../utils/validators.js'

import User from '../../models/User.js'

const userResolvers = {
	Query    : {
		getUsers : async () => {
			try {
				const users = await User.find({})
				return users
			} catch (err) {
				throw new Error(err)
			}
		}
	},
	Mutation : {
		register : async (
			_,
			{ registerInput: { name, email, password, confirmPassword } }
		) => {
			const { valid, errors } = validateRegisterInput(
				name,
				email,
				password,
				confirmPassword
			)
			if (!valid) {
				throw new UserInputError('Errors', { errors })
			}

			// verify no other user with that email
			const userExists = await User.findOne({ email })
			if (userExists) {
				throw new UserInputError('Registration failed', {
					// this object will be used on the frontend to display errors on the form
					errors : {
						message : 'User already exists.'
					}
				})
			}

			try {
				const user = await User.create({
					name,
					email,
					// password will be hashed pre=save by middleware in model
					password
				})

				const token = generateToken(user._id)

				return {
					_id   : user._id,
					...user._doc,
					token
				}
			} catch (err) {
				throw new UserInputError('Registration failed', {
					// this object will be used on the frontend to display errors on the form
					errors : {
						message : 'Registration failed, please try again.'
					}
				})
			}
		},
		login    : async (_, { email, password }) => {
			const { valid, errors } = validateLoginInput(email, password)
			if (!valid) {
				throw new UserInputError('Errors', { errors })
			}
			try {
				const user = await User.findOne({ email })

				const isMatched = await user.matchPassword(password)

				if (!isMatched) {
					throw new Error
				}
        
				const token = generateToken(user._id)

				return {
					_id   : user._id,
					...user._doc,
					token
				}
			} catch (err) {
				throw new UserInputError('Login failed', {
					errors : {
						message : 'Wrong credentials'
					}
				})
			}
		}
	}
}

export default userResolvers
