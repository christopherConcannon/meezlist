import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listListingDetails } from '../actions/listingActions'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const ListingPage = ({ match }) => {
	const dispatch = useDispatch()

	const listingDetails = useSelector((state) => state.listingDetails)
	const { listing, loading, error } = listingDetails

	useEffect(
		() => {
			dispatch(listListingDetails(match.params.id))
		},
		[ match, dispatch ]
	)

	return (
		<React.Fragment>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : listing.images && (
				<React.Fragment>
					<Meta title={listing.title} />
					<Row>
						<Col md={6}>
							{/* pass fluid prop to keep image in it's container */}
							<Image src={listing.images[0]} alt={listing.title} fluid />
						</Col>
						<Col md={6}>
							{/* Add the flush variant to remove outer borders and rounded corners */}
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{listing.title}</h3>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${listing.price}</ListGroup.Item>
								<ListGroup.Item>Description: {listing.description}</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default ListingPage
