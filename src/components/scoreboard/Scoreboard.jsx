import './styles/Scoreboard.css';

export default function Scoreboard(props) {
  const { currentScore, bestScore } = props;

  return (
    <div className="scoreboard">
      <div className="score__container scoreboard__current">
        <h2 className="scoreboard__title">Current score:</h2>
        <p className="scoreboard__score">{currentScore}</p>
      </div>
      <div className="score__container scoreboard__best">
        <h2 className="scoreboard__title">Best score:</h2>
        <p className="scoreboard__score">{bestScore}</p>
      </div>
    </div>
  );
}
