import { useState, useEffect } from 'react';
import './styles/DisplayController.css';

export default function DisplayController(props) {
  const { cards, moveTrigger } = props;
  const [shuffledCards, setShuffledCards] = useState([]);

  // [cards, moveTrigger] -> cards ensures shuffle on game initialisation, moveTrigger ensures shuffle after each user move
  useEffect(() => {
    // simple randomisation function
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, [cards, moveTrigger]);

  return (
    <div className="gameboard">
      {shuffledCards.map((card) => (
        <div className="card-container" key={card.props.id}>
          {card}
        </div>
      ))}
    </div>
  );
}
