import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'

let store;

if(process.env.NODE_ENV === 'development') {
  store = createStore(reducer, composeWithDevTools())
} else {
  store = createStore(reducer)
}

export default store;