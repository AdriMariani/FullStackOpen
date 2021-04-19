const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
      return [...state, asObject(action.data.content)]
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

export const createAnecdote = content => {
  return {
    type: 'CREATE_ANECDOTE',
    data: { content }
  }
}

export default anecdoteReducer