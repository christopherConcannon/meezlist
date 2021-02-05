import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { listingListReducer, listingDetailsReducer } from './reducers/listingReducers'
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers'
// import { listingData } from './data/data'

const reducer = combineReducers({
  listingList : listingListReducer,
  listingDetails: listingDetailsReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
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
