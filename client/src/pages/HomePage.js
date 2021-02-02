import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Listing from '../components/Listing'

const HomePage = () => {

  const listings  = useSelector((state) => state.listings)

  return (
    <React.Fragment>
    <Row>
      {listings.map((listing) => (
        <Col key={listing._id} sm={12} md={6} lg={4} xl={3}>
          <Listing {...listing} />
        </Col>
      ))}
    </Row>
  </React.Fragment>
  )
}

export default HomePage
