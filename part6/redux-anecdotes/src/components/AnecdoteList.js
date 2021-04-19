import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter.toLowerCase())
  const dispatch = useDispatch()
  let sortedAnecdotes

  if(filter !== '') {
    sortedAnecdotes = [].concat(anecdotes)
      .filter(anecdote => anecdote.content.toLowerCase().startsWith(filter))
      .sort((a,b) => b.votes - a.votes)
  } else {
    sortedAnecdotes = [].concat(anecdotes).sort((a,b) => b.votes - a.votes)
  }

  const handleVote = anecdote => {
    return () => {
      dispatch(vote(anecdote))
      dispatch(setNotification(`You Voted "${anecdote.content}"`, 5))
    }
  }

  return (
    sortedAnecdotes.map(anecdote => 
      <Anecdote 
        key={anecdote.id} 
        anecdote={anecdote} 
        voteHandler={handleVote(anecdote)}
      />
    )
  )
}

export default AnecdoteList