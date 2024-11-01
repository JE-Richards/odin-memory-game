import GameController from '../GameController';
import { useState } from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';

const gameSize = 5;
const mockHandleUpdate = jest.fn();
const mockInitialiseGame = jest.fn();

function GameControllerWrapper({ gameSize, onGameUpdate, onInitialiseGame }) {
  const controller = GameController({
    gameSize,
    onGameUpdate: (data) => {
      // Need to manually call the set functions here so that the wrapper correctly reflects updates to the controller
      setScore(data.score);
      setBestScore(data.bestScore);
      setGameStatus(data.gameStatus);
      onGameUpdate(data);
    },
    onInitialiseGame,
  });

  // Expose the GameController's returned values as state
  const [score, setScore] = useState(controller.score);
  const [bestScore, setBestScore] = useState(controller.bestScore);
  const [gameStatus, setGameStatus] = useState(controller.gameStatus);

  const handleMove = (card) => {
    controller.executeUserMove(card);
  };

  return (
    <div>
      <p data-testid="score">Score: {score}</p>
      <p data-testid="bestScore">Best Score: {bestScore}</p>
      <p data-testid="gameStatus">Status: {gameStatus}</p>
      <button data-testid="moveButton" onClick={() => handleMove(1)}>
        Make Move
      </button>
      <button data-testid="resetButton" onClick={() => controller.resetGame()}>
        Reset Game
      </button>
      <button
        data-testid="initButton"
        onClick={() => controller.initialiseGame(gameSize, 1, 5)}
      >
        Initialise Game
      </button>

      <button data-testid="moveButtonTwo" onClick={() => handleMove(2)}>
        Make Move Two
      </button>
      <button data-testid="moveButtonThree" onClick={() => handleMove(3)}>
        Make Move Three
      </button>
      <button data-testid="moveButtonFour" onClick={() => handleMove(4)}>
        Make Move Four
      </button>
      <button data-testid="moveButtonFive" onClick={() => handleMove(5)}>
        Make Move Five
      </button>
    </div>
  );
}

beforeEach(() => {
  render(
    <GameControllerWrapper
      gameSize={gameSize}
      onGameUpdate={mockHandleUpdate}
      onInitialiseGame={mockInitialiseGame}
    />
  );
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the GameController component', () => {
  describe('Testing initial render', () => {
    test('Game is initialised with the correct default values', () => {
      expect(screen.getByTestId('score').textContent).toBe('Score: 0');
      expect(screen.getByTestId('bestScore').textContent).toBe('Best Score: 0');
      expect(screen.getByTestId('gameStatus').textContent).toBe(
        'Status: playing'
      );
    });
  });

  describe('Testing component functions', () => {
    test('initiateGame generates the correct number of unique IDs', () => {
      const initBtn = screen.getByTestId('initButton');

      fireEvent.click(initBtn);

      expect(mockInitialiseGame).toHaveBeenCalledTimes(1);

      const expectedArraySize = gameSize;
      // Access the elements from the first call made to mock.calls
      const [[randomIds]] = mockInitialiseGame.mock.calls; // nested destructuring, first [] to access first element of mock.calls, second [randomIds] accesses first element of the first array

      expect(randomIds.length).toBe(expectedArraySize);
      expect(new Set(randomIds).size).toBe(expectedArraySize);
    });

    test('Game correctly updates on user move', async () => {
      const initBtn = screen.getByTestId('initButton');
      fireEvent.click(initBtn);

      const moveBtn = screen.getByTestId('moveButton');
      fireEvent.click(moveBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 1');
        expect(mockHandleUpdate).toHaveBeenCalledTimes(2); // it gets called once on game initialisation
        expect(mockHandleUpdate).toHaveBeenCalledWith(
          expect.objectContaining({ score: 1 })
        );
      });
    });

    test('resetGame correctly resets the game state', async () => {
      const initBtn = screen.getByTestId('initButton');
      fireEvent.click(initBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 0');
      });

      const moveBtn = screen.getByTestId('moveButton');
      fireEvent.click(moveBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 1');
      });

      const resetBtn = screen.getByTestId('resetButton');
      fireEvent.click(resetBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 0');
        expect(mockHandleUpdate).toHaveBeenCalledTimes(3);
        expect(mockHandleUpdate.mock.calls[2][0]).toStrictEqual({
          score: 0,
          bestScore: 1,
          gameStatus: 'playing',
        });
      });
    });
  });

  describe('Testing win/lose logic', () => {
    test('Picking the same option twice results in a loss', async () => {
      const initBtn = screen.getByTestId('initButton');
      fireEvent.click(initBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 0');
      });

      const moveBtn = screen.getByTestId('moveButton');
      fireEvent.click(moveBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 1');
      });

      fireEvent.click(moveBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 1');
        expect(screen.getByTestId('gameStatus').textContent).toBe(
          'Status: lost'
        );
      });
    });

    test('Picking all options once results in a win', async () => {
      // Initialise game, 5 unique IDs
      const initBtn = screen.getByTestId('initButton');
      fireEvent.click(initBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 0');
      });

      // Go through each ID individually - tests score incraments and ends with testing win condition
      const moveBtn = screen.getByTestId('moveButton');
      const moveBtnTwo = screen.getByTestId('moveButtonTwo');
      const moveBtnThree = screen.getByTestId('moveButtonThree');
      const moveBtnFour = screen.getByTestId('moveButtonFour');
      const moveBtnFive = screen.getByTestId('moveButtonFive');

      fireEvent.click(moveBtn);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 1');
      });

      fireEvent.click(moveBtnTwo);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 2');
      });

      fireEvent.click(moveBtnThree);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 3');
      });

      fireEvent.click(moveBtnFour);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 4');
      });

      fireEvent.click(moveBtnFive);
      await waitFor(() => {
        expect(screen.getByTestId('score').textContent).toBe('Score: 5');
        expect(screen.getByTestId('gameStatus').textContent).toBe(
          'Status: won'
        );
      });
    });
  });
});
