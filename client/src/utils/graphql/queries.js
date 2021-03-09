import gql from 'graphql-tag'

export const GET_LISTINGS = gql`
	query {
		getListings {
			_id
			user 
			title
			description
			images
			brand
			category
			location
			price
			createdAt
			updatedAt
		}
	}
`

export const GET_LISTING = gql`
	query GetListing($listingId: ID!) {
		getListing(listingId: $listingId) {
			_id
			# user {
      #   id
      #   name
      # }
			title
			description
			images
			brand
			# category
			# location
			price
			# createdAt
			# updatedAt
		}
	}
`
