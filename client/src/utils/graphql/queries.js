import gql from 'graphql-tag'

export const GET_LISTINGS = gql`
	query {
		getListings {
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
