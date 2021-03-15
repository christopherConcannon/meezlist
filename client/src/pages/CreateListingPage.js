import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_LISTING } from '../utils/graphql/mutations'

import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const CreateListingPage
 = ({ history }) => {
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ brand, setBrand ] = useState('')
  const [ category, setCategory ] = useState('')
	const [ message, setMessage ] = useState(null)
	const [ errors, setErrors ] = useState({})

  const [ createListing ] = useMutation(CREATE_LISTING, {
    variables: {
      title, 
      description,
      brand,
      category
    },
		onError(err) {
      console.log(err);
			setErrors(err.graphQLErrors[0].extensions.exception.errors)
		}
  })

	const submitHandler = async (e) => {
		e.preventDefault()
    try { 
      const mutationResponse = await createListing()
      console.log(mutationResponse.data.createListing);
    } catch(err) {
      console.log(err);
    }
	}

	return (
		<FormContainer>
			<h1>add new listing</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='title'>
					<Form.Label>title</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter title'
						value={title}
						// error={errors.title ? 1 : 0}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='description'>
					<Form.Label>description</Form.Label>
					<Form.Control
						type='textarea'
						placeholder='Enter description'
						value={description}
						// error={errors.description ? 1 : 0}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>
        <Form.Group controlId='brand'>
					<Form.Label>brand</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter brand'
						value={brand}
						// error={errors.brand ? 1 : 0}
						onChange={(e) => setBrand(e.target.value)}
					/>
				</Form.Group>
        <Form.Group controlId='category'>
					<Form.Label>category</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter category'
						value={category}
						// error={errors.category ? 1 : 0}
						onChange={(e) => setCategory(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' variant='primary'>
					add listing
				</Button>
			</Form>
		</FormContainer>
	)
}

export default CreateListingPage

