import gql from 'graphql-tag'

export const REGISTER_USER = gql`
  	mutation register(
		$name: String!
		$email: String!
		$password: String!
	) {
		register(
			registerInput: {
				name: $name
				email: $email
				password: $password
			}
		) {
			_id
			name
			email
			token
		}
	}
` 