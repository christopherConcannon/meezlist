import axios from 'axios'
import {
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_CLEAR,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT
} from '../constants/userConstants'

export const addUser = (data) => async (dispatch) => {
	try {
		dispatch({
			type : USER_REGISTER_REQUEST
		})

		dispatch({
			type    : USER_REGISTER_SUCCESS,
			payload : data
		})

		// immediately login so userLogin.userInfo is avail for Header
		dispatch({
			type    : USER_LOGIN_SUCCESS,
			payload : data
		})

		dispatch({
			type : USER_REGISTER_CLEAR
		})

		const token = data.token
		const userId = data._id

		localStorage.setItem('userInfo', JSON.stringify({userId, token}))
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

export const login = (data) => async (dispatch) => {
	try {
		dispatch({
			type : USER_LOGIN_REQUEST
		})

		dispatch({
			type    : USER_LOGIN_SUCCESS,
			payload : data
		})

		const token = data.token
		const userId = data._id

		localStorage.setItem('userInfo', JSON.stringify({userId, token}))
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
