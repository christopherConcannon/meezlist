import {
	LISTING_LIST_REQUEST,
	LISTING_LIST_SUCCESS,
	LISTING_LIST_FAIL,
	LISTING_DETAILS_REQUEST,
	LISTING_DETAILS_FAIL,
  LISTING_DETAILS_SUCCESS,
	LISTING_CREATE_REQUEST,
	LISTING_CREATE_FAIL,
  LISTING_CREATE_SUCCESS,
  LISTING_CLEAR
} from '../constants/listingConstants'

export const listingListReducer = (state = { listings: [] }, action) => {
	switch (action.type) {
		case LISTING_LIST_REQUEST:
			return { loading: true, listings: [] }
		case LISTING_LIST_SUCCESS:
			return {
				loading  : false,
				listings : action.payload
			}
		case LISTING_LIST_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const listingDetailsReducer = (state = { listing: {} }, action) => {
	switch (action.type) {
		case LISTING_DETAILS_REQUEST:
			return { loading: true }
		case LISTING_DETAILS_SUCCESS:
			return { loading: false, listing: action.payload }
		case LISTING_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case LISTING_CLEAR:
      return { loading: false, listing: {} }
    default:
      return state
	}
}

export const listingCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case LISTING_CREATE_REQUEST:
			return { loading: true }
		case LISTING_CREATE_SUCCESS:
			return {
				loading  : false,
				listing : action.payload
			}
		case LISTING_CREATE_FAIL:
			return { loading: false, error: action.payload }
    case LISTING_CLEAR:
      return { loading: false, listing: {} }

		default:
			return state
	}
}

