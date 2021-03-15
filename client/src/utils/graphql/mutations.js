import gql from 'graphql-tag'

export const REGISTER_USER = gql`
	mutation register(
		$name: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				name: $name
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			_id
			name
			email
			token
		}
	}
`

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			_id
			name
			email
			token
		}
	}
`

export const CREATE_LISTING = gql`
	mutation createListing(
		$title: String!
		$description: String!
		$brand: String!
		$category: String!
	) {
		createListing(
			createListingInput: {
				title: $title
				description: $description
				brand: $brand
				category: $category
			}
		) {
			_id
			user {
				_id
				name
			}
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
