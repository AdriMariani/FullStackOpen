import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const FeedbackInput = ({handleClick}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClick("good")} text="good"/>
      <Button onClick={handleClick("neutral")} text="neutral"/>
      <Button onClick={handleClick("bad")} text="bad"/>
    </div>
  )
}

const ShowStats = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;
  const positive = total > 0 ? good / total * 100 : 0;

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateState = {
    good() {
      setGood(good + 1)
    },
    neutral() {
      setNeutral(neutral + 1)
    },
    bad() {
      setBad(bad + 1)
    }
  }

  const handleClick = (type) => {
    return () => {
      updateState[type]()
    }
  }

  return (
    <div>
      <FeedbackInput handleClick={handleClick}/>
      <ShowStats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
