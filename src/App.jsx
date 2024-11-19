import './App.css';
import { useState, useEffect } from 'react';
import fetchAllData from './api/fetchAllData.js';
import processAllData from './api/processAllData.js';
import Header from './components/header/Header.jsx';
import Scoreboard from './components/scoreboard/Scoreboard.jsx';
import DisplayController from './components/display-controller/DisplayController.jsx';
import Card from './components/cards/Card.jsx';

function App() {
  const [gameSize, setGameSize] = useState(3);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [cards, setCards] = useState([]);
  const [moveTrigger, setMoveTrigger] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  const headerInfo = {
    title: 'Memory Game',
    rules: (
      <ul className="game-rules">
        <li>
          Your goal is to click each card exactly{' '}
          <span className="bold">once.</span>
        </li>
        <li>
          <span className="bold">Earn 1 point </span>for every unique card you
          click.
        </li>
        <li>
          <span className="bold">It's Game Over </span>if you click the same
          card more than once
        </li>
        <li>
          <span className="bold">Win the game </span>clicking all cards without
          any repeats.
        </li>
      </ul>
    ),
  };

  const incrementMoveTrigger = () =>
    setMoveTrigger((prevMoveTrigger) => prevMoveTrigger + 1);

  const generateRandomIds = (count, min, max) => {
    let uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
      uniqueNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return [...uniqueNumbers];
  };

  const resetGame = () => {
    setScore(0);
    setSelectedCards([]);
    setGameStatus('playing');
    setMoveTrigger(0);
  };

  const handleCardClick = (id) => {
    // wrapping logic inside setSelectedCards to prevent using stale states
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(id)) {
        setGameStatus('lost');
        setBestScore((prev) => Math.max(prev, score));
        return prevSelectedCards;
      } else {
        const updatedSelectedCards = [...prevSelectedCards, id];

        setScore((prevScore) => {
          const newScore = prevScore + 1;
          setBestScore((prevBest) => Math.max(prevBest, newScore));
          return newScore;
        });

        if (updatedSelectedCards.length === gameSize) {
          setGameStatus('won');
        }

        incrementMoveTrigger();
        return updatedSelectedCards;
      }
    });
  };

  const initialiseGame = async (size, min, max) => {
    const randomIds = generateRandomIds(size, min, max);
    const rawData = await fetchAllData(randomIds);
    const processedData = processAllData(rawData.data);

    const cardInstances = processedData.map((cardData) => (
      <Card
        key={cardData.id}
        id={cardData.id}
        name={cardData.name}
        image={cardData.sprite}
        onCardClick={handleCardClick}
      />
    ));
    setCards(cardInstances);
    resetGame();
  };

  useEffect(() => {
    initialiseGame(gameSize, 1, 500);
  }, []);

  const scoreboard = <Scoreboard currentScore={score} bestScore={bestScore} />;

  const header = (
    <Header
      title={headerInfo.title}
      rules={headerInfo.rules}
      scoreboard={scoreboard}
    />
  );

  return (
    <div className="app">
      {header}
      <div className="container">
        <DisplayController cards={cards} moveTrigger={moveTrigger} />
      </div>
    </div>
  );
}

export default App;
