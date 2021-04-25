import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
  const addAnecdote = e => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    props.createAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm)

// Code using useDispatch hook
// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { createAnecdote } from '../reducers/anecdoteReducer'

// const AnecdoteForm = props => {
//   const dispatch = useDispatch()

//   const addAnecdote = e => {
//     e.preventDefault()
//     const content = e.target.newAnecdote.value
//     e.target.newAnecdote.value = ''
//     dispatch(createAnecdote(content))
//   }

//   return (
//     <div>
//       <h2>create new</h2>
//       <form onSubmit={addAnecdote}>
//         <div><input name='newAnecdote' /></div>
//         <button type='submit'>create</button>
//       </form>
//     </div>
//   )
// }

// export default AnecdoteForm