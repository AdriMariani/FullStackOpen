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
      return [...state, action.data.anecdote]
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

export const initialAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: { anecdotes }
  }
}

export const vote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = anecdote => {
  return {
    type: 'CREATE_ANECDOTE',
    data: { anecdote }
  }
}

export default anecdoteReducer