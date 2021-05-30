const initialState = {
  message: '',
  isError: false,
  timeoutReference: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.timeoutReference)
      return action.data
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, isError, duration) => {
  return dispatch => {
    const timeoutReference = setTimeout(() => dispatch(removeNotification()), duration * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, isError, timeoutReference }
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer