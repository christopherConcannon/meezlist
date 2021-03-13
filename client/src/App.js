import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ListingPage from './pages/ListingPage'
import CreateListingPage from './pages/CreateListingPage'

const App = () => {
	return (
		<Router>
			<Header />
			<Container>
				<Switch>
					<Route path='/register' component={RegisterPage} />
					<Route path='/login' component={LoginPage} />
					<Route path='/listing/new' component={CreateListingPage} />
					<Route path='/listing/:id' component={ListingPage} />
					<Route path='/' exact component={HomePage} />
				</Switch>
			</Container>
		</Router>
	)
}

export default App
