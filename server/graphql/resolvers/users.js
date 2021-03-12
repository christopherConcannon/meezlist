import { AuthenticationError } from 'apollo-server-express'

import User from '../../models/User.js'

const userResolvers = {
	Query    : {},
	Mutation : {
		async register(_, { registerInput: { name, email, password } }) {
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
          _id: user._id,
          ...user._doc,
          token
        }
        
			} catch (err) {
				throw new Error(err)
			}
		}
	}
}

// async	register(
//   _,
//   { registerInput: { username, email, password, confirmPassword } }
// ) {
//   // TODO: validate user data
//   const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
//   if (!valid) {
//     throw new UserInputError('Errors', { errors })
//   }
//   // TODO: make sure user doesn't already exist
//   const user = await User.findOne({ username })
//   if (user) {
//     throw new UserInputError('Username is taken', {
//       // this object will be used on the frontend to display errors on the form
//       errors: {
//         username: 'This username is taken'
//       }
//     })
//   }
//   // TODO: hash password and create auth token
//   password = await bcrypt.hash(password, 12)

//   const newUser = new User({
//     email,
//     username,
//     password,
//     createdAt: new Date().toISOString()
//   })

//   const res = await newUser.save()
//   console.log("response: ", res._doc)

//   const token = generateToken(res)

//   // if you want to add properties to the Model which are not defined in the schema, you must access the model using ._doc
//   return {
//     ...res._doc,
//     id: res._id,
//     token
//   }
// }
