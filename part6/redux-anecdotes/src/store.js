import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

let store

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

if(process.env.NODE_ENV === 'development') {
  store = createStore(reducer, composeWithDevTools())
} else {
  store = createStore(reducer)
}

export default store;