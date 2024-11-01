import { useState } from 'react';

export default function GameController(props) {
  const { gameSize, onGameUpdate, onInitialiseGame } = props;

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost
  const [selectedCards, setSelectedCards] = useState([]);

  const generateRandomNumbers = (count, min, max) => {
    let uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
      uniqueNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return [...uniqueNumbers];
  };

  const initialiseGame = (size, min, max) => {
    let randomIds = generateRandomNumbers(size, min, max);
    onInitialiseGame(randomIds);

    // Ensure game state is reset
    resetGame();
  };

  const resetGame = () => {
    setScore(0);
    setSelectedCards([]);
    setGameStatus('playing');

    // bestScore isn't being reset so can be called directly
    // need to manually assign the others here because of how React state updates work (they're async and don't reflect the changes until next re-render)
    onGameUpdate({
      score: 0,
      bestScore,
      gameStatus: 'playing',
    });
  };

  const executeUserMove = (card) => {
    // check if card has previously selected -> lose + check best score
    if (selectedCards.includes(card)) {
      setGameStatus('lost');
      if (score > bestScore) {
        setBestScore(score);
      }
      // avoid using stale states when calling onGameUpdate!
      onGameUpdate({
        score,
        bestScore: Math.max(score, bestScore),
        gameStatus: 'lost',
      });
    } else {
      const newScore = score + 1;
      setSelectedCards([...selectedCards, card]);
      setScore(newScore);

      const newBestScore = Math.max(newScore, bestScore);
      setBestScore(newBestScore);

      // Check if user wins. selectedCards.length + 1 because selectedCards state wouldn't be updated to new value yet
      if (selectedCards.length + 1 === gameSize) {
        setGameStatus('won');
        onGameUpdate({
          score: newScore,
          bestScore: newBestScore,
          gameStatus: 'won',
        });
      } else {
        onGameUpdate({
          score: newScore,
          bestScore: newBestScore,
          gameStatus: 'playing',
        });
      }
    }
  };

  return {
    score,
    bestScore,
    gameStatus,
    initialiseGame,
    resetGame,
    executeUserMove,
  };
}
