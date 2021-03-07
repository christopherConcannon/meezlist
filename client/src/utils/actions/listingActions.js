import axios from 'axios'
import {
	LISTING_LIST_REQUEST,
	LISTING_LIST_SUCCESS,
	LISTING_LIST_FAIL,
  LISTING_DETAILS_REQUEST,
  LISTING_DETAILS_SUCCESS,
  LISTING_DETAILS_FAIL,
  CLEAR_LISTING
} from '../constants/listingConstants'

export const listListings = (data) => async (dispatch) => {
	try {
		dispatch({ type: LISTING_LIST_REQUEST })

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

export const listListingDetails = (data) => async (dispatch) => {
  try {
    dispatch({ type: LISTING_DETAILS_REQUEST})

    dispatch({
      type: LISTING_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
			type    : LISTING_DETAILS_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
  }
}

export const clearListing = () => async (dispatch) => {
  dispatch({ type: CLEAR_LISTING})
}
