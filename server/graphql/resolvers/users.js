import { AuthenticationError, UserInputError } from 'apollo-server-express'
import generateToken from '../../utils/generateToken.js'
import { validateRegisterInput, validateLoginInput } from '../../utils/validators.js'

import User from '../../models/User.js'

const userResolvers = {
	Query    : {},
	Mutation : {
		async register(_, { registerInput: { name, email, password, confirmPassword } }) {
			const { valid, errors } = validateRegisterInput(
				name,
				email,
				password,
				confirmPassword
			)
			if (!valid) {
				throw new UserInputError('Errors', { errors })
			}

			try {
				// verify no other user with that email
				const userExists = await User.findOne({ email })
				if (userExists) {
					throw new Error('User already exists')
				}

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
				throw new Error(err)
			}
		}
	}
}

export default userResolvers
