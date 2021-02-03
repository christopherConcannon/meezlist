import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import { User } from '../models/index.js'

// @desc    Register a new user & get token
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

  // verify no other user with that email
	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

  
	const user = await User.create({
		name,
    email,
    // password will be hashed pre=save by middleware in model
		password
	})

	if (user) {
		res.status(201).json({
			_id     : user._id,
			name    : user.name,
			email   : user.email,
			token   : generateToken(user._id)
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

  // find user in db by email
	const user = await User.findOne({ email })

	// if user is found call model instance method to match pw
	if (user && (await user.matchPassword(password))) {
    // if password is a match, return user object from db, adding a token property to the response (but not kept in the db)
		res.json({
			_id     : user._id,
			name    : user.name,
			email   : user.email,
			// call function to create and sign token, passing the user's id which will be embedded in the token and we can access when we decode
			token   : generateToken(user._id)
		})
	} else {
		// 401 - Unauthorized
		res.status(401)
		throw new Error('Invalid email or passwod')
	}
})



export {
  registerUser, 
  authUser
}
