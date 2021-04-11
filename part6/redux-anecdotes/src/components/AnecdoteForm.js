import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
  const dispatch = useDispatch()

  const addAnecdote = e => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='newAnecdote' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm