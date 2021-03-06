import React from 'react'
// import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Listing = ({ ...listing }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/listing/${listing._id}`}>
				<Card.Img src={listing.images[0]} variant='top' />
			</Link>
			<Card.Body>
				<Link to={`/listing/${listing._id}`}>
					<Card.Title as='div'>
						<strong>{listing.title}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<p>{listing.description}</p>
				</Card.Text>
				<Card.Text as='h3'>${listing.price}</Card.Text>
        <Card.Text>created by: {listing.user.name}</Card.Text>
				{/* <Card.Text as='h4'>created at: {moment(parseInt(listing.createdAt)).format("MMM D, YYYY")}</Card.Text> */}
			</Card.Body>
		</Card>
	)
}

export default Listing
