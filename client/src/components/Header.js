import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../utils/actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

	return (
		<header>
			<Navbar bg='light' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>meezlist</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							{userInfo ? (
							
									<Nav.Link onClick={logoutHandler}>logout</Nav.Link>
					
							) : (
								<React.Fragment>
									<LinkContainer to='/register'>
										<Nav.Link>sign up</Nav.Link>
									</LinkContainer>
									<LinkContainer to='/login'>
										<Nav.Link>login</Nav.Link>
									</LinkContainer>
								</React.Fragment>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
