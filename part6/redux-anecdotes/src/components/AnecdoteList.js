import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const sortedAnecdotes = [].concat(anecdotes).sort((a,b) => b.votes - a.votes)

  return (
    sortedAnecdotes.map(anecdote => 
      <Anecdote 
        key={anecdote.id} 
        anecdote={anecdote} 
        voteHandler={() => dispatch(vote(anecdote.id))}
      />
    )
  )
}

export default AnecdoteList