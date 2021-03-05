import axios from 'axios'
import { 
  USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from '../constants/userConstants'

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type : USER_REGISTER_REQUEST
		})

		// dispatch({
		// 	type    : USER_REGISTER_SUCCESS,
		// 	payload : data
		// })

		// immediately login so userLogin.userInfo is avail for Header
		// dispatch({
		// 	type    : USER_LOGIN_SUCCESS,
		// 	payload : data
    // })
    
		// localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type    : USER_REGISTER_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type : USER_LOGIN_REQUEST
		})

    // // when we're sending data, we want to send the Content-Type in the headers
		// const config = {
		// 	headers : {
		// 		'Content-Type' : 'application/json'
		// 	}
		// }

		// const { data } = await axios.post('/api/users/login', { email, password }, config)

		// dispatch({
		// 	type    : USER_LOGIN_SUCCESS,
		// 	payload : data
		// })

    // when user is authenticated add to local storage so info will persist on subsequent visits
		// localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type    : USER_LOGIN_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
}