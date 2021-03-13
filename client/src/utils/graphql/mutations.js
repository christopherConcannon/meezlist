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
  	mutation login(
		$email: String!
		$password: String!
	) {
		login(
				email: $email
				password: $password
		) {
			_id
			name
			email
			token
		}
	}
` 