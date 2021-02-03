import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'


const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Route path='/' exact component={HomePage} />
        <Route path='/register' exact component={RegisterPage} />
        <Route path='/login' exact component={LoginPage} />
      </Container>
    </Router>

  )
}

export default App
