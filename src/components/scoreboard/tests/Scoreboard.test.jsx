import Scoreboard from '../Scoreboard';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useState } from 'react';

function MockParentComponent({ current, best }) {
  const [currentScore, setCurrentScore] = useState(current);
  const [bestScore, setBestScore] = useState(best);

  function increaseCurrentScore() {
    setCurrentScore((prevScore) => {
      return (prevScore += 1);
    });
  }

  function increaseBestScore() {
    setBestScore((prevScore) => {
      return (prevScore += 1);
    });
  }

  return (
    <div>
      <button onClick={() => increaseCurrentScore()}>
        Increase current score
      </button>
      <button onClick={() => increaseBestScore()}>Increase best score</button>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
    </div>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Scoreboard component', () => {
  describe('Testing the initial render', () => {
    test('Component renders correctly', () => {
      render(<Scoreboard currentScore={1} bestScore={2} />);

      const currentScoreTitle = screen.getByText('Current score:');
      const currentScoreValue = screen.getByText('1');
      const currentScoreDiv = currentScoreTitle.parentElement;
      const scoreboard = currentScoreDiv.parentElement;
      const bestScoreTitle = screen.getByText('Best score:');
      const bestScoreValue = screen.getByText('2');
      const bestScoreDiv = bestScoreTitle.parentElement;

      expect(scoreboard).toBeInTheDocument();
      expect(scoreboard).toHaveClass('scoreboard');
      expect(currentScoreDiv).toBeInTheDocument();
      expect(currentScoreDiv).toHaveClass(
        'score__container',
        'scoreboard__current'
      );
      expect(scoreboard).toContainElement(currentScoreDiv);
      expect(currentScoreTitle).toBeInTheDocument();
      expect(currentScoreTitle).toHaveClass('scoreboard__title');
      expect(currentScoreDiv).toContainElement(currentScoreTitle);
      expect(currentScoreValue).toBeInTheDocument();
      expect(currentScoreValue).toHaveClass('scoreboard__score');
      expect(currentScoreDiv).toContainElement(currentScoreValue);
      expect(bestScoreDiv).toBeInTheDocument();
      expect(bestScoreDiv).toHaveClass('score__container', 'scoreboard__best');
      expect(scoreboard).toContainElement(bestScoreDiv);
      expect(bestScoreTitle).toBeInTheDocument();
      expect(bestScoreTitle).toHaveClass('scoreboard__title');
      expect(bestScoreDiv).toContainElement(bestScoreTitle);
      expect(bestScoreValue).toBeInTheDocument();
      expect(bestScoreValue).toHaveClass('scoreboard__score');
      expect(bestScoreDiv).toContainElement(bestScoreValue);
    });

    test('Component can render 0 and negative values correctly', () => {
      render(<Scoreboard currentScore={-1} bestScore={0} />);

      const currentScoreValue = screen.getByText('-1');
      const bestScoreValue = screen.getByText('0');

      expect(currentScoreValue).toBeInTheDocument();
      expect(bestScoreValue).toBeInTheDocument();
    });
  });

  describe('Testing reactive updating to displayed scores', () => {
    test('Display scores update as the score values change', () => {
      render(<MockParentComponent current={1} best={9} />);

      const increaseCurrScoreBtn = screen.getByRole('button', {
        name: 'Increase current score',
      });
      const increaseBestScoreBtn = screen.getByRole('button', {
        name: 'Increase best score',
      });
      const currentScoreValue = screen.getByText('1');
      const bestScoreValue = screen.getByText('9');

      expect(currentScoreValue).toBeInTheDocument();
      expect(currentScoreValue).toHaveTextContent('1');
      expect(bestScoreValue).toBeInTheDocument();
      expect(bestScoreValue).toHaveTextContent('9');

      fireEvent.click(increaseCurrScoreBtn);
      expect(currentScoreValue).toHaveTextContent('2');

      fireEvent.click(increaseBestScoreBtn);
      expect(bestScoreValue).toHaveTextContent('10');
    });
  });
});
