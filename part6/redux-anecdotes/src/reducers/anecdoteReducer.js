import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(a => a.id === id ? changedAnecdote : a)
    case 'CREATE_ANECDOTE':
      return [...state, action.data.newAnecdote]
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: { anecdotes }
    })
  }
}

export const vote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = content => {
  return async dispatch => { 
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: { newAnecdote }
    })
  }
}

export default anecdoteReducer