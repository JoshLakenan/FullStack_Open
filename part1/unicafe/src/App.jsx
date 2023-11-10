import { useState } from 'react'

const Button = props => {
  return (
    <button onClick={props.buttonHandler}>
      {props.buttonTxt}
    </button>
  )
}

const Statistics = ({ state }) => {
  const { good, neutral, bad } = state;

  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = good / all

  if (![good, neutral, bad].some(Boolean)) {
    return (<p>No feedback Given</p>)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <StatisticLine metric='good' value={good}/>
          <StatisticLine metric='neutral' value={neutral}/>
          <StatisticLine metric='bad' value={bad}/>
          <StatisticLine metric='all' value={all}/>
          <StatisticLine metric='average' value={average}/>
          <StatisticLine metric='positive' value={positive}/>
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = props => {
  return (
    <tr>
      <td>{props.metric}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const state = {good, neutral, bad}

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button buttonHandler={handleGoodClick} buttonTxt='Good'/>
      <Button buttonHandler={handleNeutralClick} buttonTxt='Neutral'/>
      <Button buttonHandler={handleBadClick} buttonTxt='Bad'/>

      <h1>Statistics</h1>
      <Statistics state={state}/>

    </>

  )
}

export default App