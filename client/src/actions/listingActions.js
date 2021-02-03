import axios from 'axios'
import {
	LISTING_LIST_REQUEST,
	LISTING_LIST_SUCCESS,
	LISTING_LIST_FAIL
} from '../constants/listingConstants'

export const listListings = () => async (dispatch) => {
	try {
		dispatch({ type: LISTING_LIST_REQUEST })

    const { data } = await axios.get('/api/listings')
    
    

		dispatch({
			type    : LISTING_LIST_SUCCESS,
			payload : data
		})
	} catch (error) {
		dispatch({
			type    : LISTING_LIST_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}
