import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomePage from './pages/HomePage'


const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Route path='/' exact component={HomePage} />
      </Container>
    </Router>

  )
}

export default App
