import React from 'react'
import ApolloClient from 'apollo-client'
// apollo-boost is another alternative for this setup
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'

import App from './App'

const httpLink = createHttpLink({
	uri : '/graphql'
})

// middleware that will merge existing headers of the request with this headers object with Authorization to send along token with request
// const authLink = setContext(() => {
// 	const token = localStorage.getItem('jwtToken')
// 	return {
// 		headers : {
// 			Authorization : token ? `Bearer ${token}` : ''
// 		}
// 	}
// })

const client = new ApolloClient({
	// add token to request
	link  : httpLink,
	// link  : authLink.concat(httpLink),
	// this will store any cached data
	cache : new InMemoryCache()
})

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
