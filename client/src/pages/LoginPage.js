import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_USER } from '../utils/graphql/mutations'
import { login } from '../utils/actions/userActions'

import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

// location and history props passed by react-router
const LoginScreen = ({ history }) => {
  // local state to control form
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

  const [ loginUser ] = useMutation(LOGIN_USER, {
    variables: {
      email,
			password
    }, 
    // onError(err) {
		// 	setErrors(err.graphQLErrors[0].extensions.exception.errors)
		// }
  })

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)

	const { userInfo, loading, error } = userLogin


  // if user is logged in, we want to redirect to HomePage
	useEffect(
		() => {
      // userInfo is truthy only if user is logged in and redux has updated the store with userInfo.  whenever that value changes we want to run this function
			if (userInfo) {
				history.push('/')
			}
		},
		[ history, userInfo ]
	)

	const submitHandler = async (e) => {
		e.preventDefault()
    try {
      const mutationResponse = await loginUser()
      dispatch(login(mutationResponse.data.login))
    } catch (err) {
      console.log(err)
    }
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Member?{' '}
					<Link to={'/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
