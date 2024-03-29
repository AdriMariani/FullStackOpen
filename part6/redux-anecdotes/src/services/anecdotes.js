import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async content => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const voteAnecdote = async anecdote => {
  await axios.put(`${baseUrl}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1 })
}

export default {
  getAll,
  addAnecdote,
  voteAnecdote
}