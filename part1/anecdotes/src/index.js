import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Anecdote = ({header, anecdote, votes}) => {
  return (
    <>
      <h1>{header}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, Array(anecdotes.length)).map(() => 0))

  const maxVotes = Math.max(...votes);
  const topAnecdoteIndex= votes.indexOf(maxVotes);

  const handleNext = () => {
    let rand;

    do {
      rand = Math.floor(Math.random() * anecdotes.length);
    }
    while(rand === selected);

    setSelected(rand);
  }

  const handleVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected]++;
    setVotes(copyVotes);
  }

  return (
    <div>
      <Anecdote 
        header="Anecdote of the day"
        anecdote={anecdotes[selected]} 
        votes={votes[selected]}
      />
      <Button text="vote" handleClick={handleVote}/>
      <Button text="next anecdote" handleClick={handleNext}/>
      {maxVotes > 0 ?
        (
          <Anecdote
            header="Anecdote with most votes"
            anecdote={anecdotes[topAnecdoteIndex]}
            votes={votes[topAnecdoteIndex]}
          />
        ) : ""
      }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)