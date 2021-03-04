import gql from 'graphql-tag'

export const GET_LISTINGS = gql`
	query {
		getListings {
			id
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
