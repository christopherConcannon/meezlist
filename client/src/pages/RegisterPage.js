import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { REGISTER_USER } from '../utils/graphql/mutations'
import { addUser } from '../utils/actions/userActions'
import Auth from '../utils/auth'

import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ history }) => {
	const [ name, setName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')
	const [ message, setMessage ] = useState(null)
	const [ errors, setErrors ] = useState({})

	const [ register ] = useMutation(REGISTER_USER, {
		variables : {
			name,
			email,
			password,
			confirmPassword
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors)
		}
	})

	const dispatch = useDispatch()

	const userRegister = useSelector((state) => state.userRegister)

	const { userInfo, loading } = userRegister

	// when userInfo has been added to global state (which depends on it having been added to db) redirect to HomeScreen
	useEffect(
		() => {
			if (userInfo) {
				history.push('/')
			}
		},
		[ history, userInfo ]
	)

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			try {
				const mutationResponse = await register()
				dispatch(addUser(mutationResponse.data.register))
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{/* {error && <Message variant='danger'>{error}</Message>} */}
			{Object.keys(errors).length > 0 &&
				Object.values(errors).map((value) => (
					<Message key={value} variant='danger'>
						{value}
					</Message>
				))}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						value={name}
						error={errors.name ? 1 : 0}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						error={errors.email ? 1 : 0}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						error={errors.password ? 1 : 0}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						error={errors.confirmPassword ? 1 : 0}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Have an Account? <Link to={'/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
