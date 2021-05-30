import usersService from '../services/users'

const blogUsersReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USERS':
      return action.data
    default:
      return state
  }
}

export const setUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'SET_USERS',
      data: users
    })
  }
}

export default blogUsersReducer