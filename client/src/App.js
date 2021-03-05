import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ListingPage from './pages/ListingPage'

const client = new ApolloClient({
	uri : 'http://localhost:3001/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Header />
				<Container>
					<Route path='/register' component={RegisterPage} />
					<Route path='/login' component={LoginPage} />
					<Route path='/listing/:id' component={ListingPage} />
					<Route path='/' exact component={HomePage} />
				</Container>
			</Router>
		</ApolloProvider>
	)
}

export default App
