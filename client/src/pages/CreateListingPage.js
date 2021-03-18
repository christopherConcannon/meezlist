import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_LISTING } from '../utils/graphql/mutations'
import { addListing, clearListing } from '../utils/actions/listingActions'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const CreateListingPage
 = ({ history }) => {
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ brand, setBrand ] = useState('')
  const [ category, setCategory ] = useState('')
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

  const dispatch = useDispatch()

  const listingAdd = useSelector((state) => state.listingAdd)

  const { listing, loading } = listingAdd

  useEffect(
		() => {
      // listing is truthy only if user is logged in and redux has updated the store with listing.  whenever that value changes we want to run this function
			if (listing) {
				history.push('/')
			}
		},
		[ history, listing ]
	)

  
	useEffect(
		() => {
			return () => dispatch(clearListing())
		},
		[ dispatch ]
	)


  

	const submitHandler = async (e) => {
		e.preventDefault()
    try { 
      const mutationResponse = await createListing()
      console.log(mutationResponse.data.createListing)
      dispatch(addListing(mutationResponse.data.createListing))
    } catch(err) {
      console.log(err);
    }
	}

	return (
		<FormContainer>
			<h1>add new listing</h1>
      {Object.keys(errors).length > 0 &&
				Object.values(errors).map((value) => (
					<Message key={value} variant='danger'>
						{value}
					</Message>
				))}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='title'>
					<Form.Label>title</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='description'>
					<Form.Label>description</Form.Label>
					<Form.Control
						type='textarea'
						placeholder='Enter description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>
        <Form.Group controlId='brand'>
					<Form.Label>brand</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter brand'
						value={brand}
						onChange={(e) => setBrand(e.target.value)}
					/>
				</Form.Group>
        <Form.Group controlId='category'>
					<Form.Label>category</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter category'
						value={category}
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

