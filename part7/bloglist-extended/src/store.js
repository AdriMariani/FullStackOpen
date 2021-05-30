import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogUsersReducer from './reducers/blogUsersReducer'

let store

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  users: blogUsersReducer,
  user: userReducer
})

if (process.env.NODE_ENV === 'development') {
  store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
} else {
  store = createStore(reducer, applyMiddleware(thunk))
}

export default store