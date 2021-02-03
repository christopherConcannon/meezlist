import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listListings } from '../actions/listingActions'
import { Row, Col } from 'react-bootstrap'
import Listing from '../components/Listing'

const HomePage = () => {

  const dispatch = useDispatch()
  const listingList  = useSelector((state) => state.listingList)
  const { listings, loading, error } = listingList

  useEffect(() => {
    dispatch(listListings())
  }, [ dispatch ])

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
