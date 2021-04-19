import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

let store

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

if(process.env.NODE_ENV === 'development') {
  store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
} else {
  store = createStore(reducer, applyMiddleware(thunk))
}

export default store;