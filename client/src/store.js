import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { listingListReducer } from './reducers/listingReducers'
import { userRegisterReducer } from './reducers/userReducers'
// import { listingData } from './data/data'

const reducer = combineReducers({
  listingList : listingListReducer,
  userRegister: userRegisterReducer
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
