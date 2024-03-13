import { useState } from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Button = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Feedback = ({ name, count }) => {
  return <p>{name} {count}</p>;
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header name="give feedback" />
      <Button name="good" onClick={handleGoodClick} />
      <Button name="neutral" onClick={handleNeutralClick} />
      <Button name="bad" onClick={handleBadClick} />
      <Header name="statistics" />
      <Feedback name="good" count={good} />
      <Feedback name="neutral" count={neutral} />
      <Feedback name="bad" count={bad} />
    </div>
  );
};

export default App;
