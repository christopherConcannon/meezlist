import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './utils/store'
import ApolloProvider from './ApolloProvider'
import './bootstrap.min.css'
import './index.css'

ReactDOM.render(
	<Provider store={store}>
    {ApolloProvider}
	</Provider>,
	document.getElementById('root')
)
