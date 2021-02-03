import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { listingListReducer } from './reducers/listingReducers'
// import { listingData } from './data/data'

const reducer = combineReducers({
	listingList : listingListReducer
})

// const initialState = {
// 	listings : listingData
// }

const middleware = [ thunk ]

const store = createStore(
	reducer,
	// initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
