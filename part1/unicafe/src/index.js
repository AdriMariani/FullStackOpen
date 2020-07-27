import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <th scope="row">{text}</th>
      <td>{value}</td>
    </tr>
  )
}

const ShowStats = ({good, neutral, bad}) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / total;
  const positive = good / total * 100;

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="all" value={total}/>
          <Statistic text="average" value={average}/>
          <Statistic text="positive" value={positive}/>
        </tbody>
      </table>
    </div>
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
