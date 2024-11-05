import DisplayController from '../DisplayController.jsx';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockCards = [
  <div key="1" id="1" name="Card 1" role="card" />,
  <div key="2" id="2" name="Card 2" role="card" />,
  <div key="3" id="3" name="Card 3" role="card" />,
  <div key="4" id="4" name="Card 4" role="card" />,
  <div key="5" id="5" name="Card 5" role="card" />,
];

afterEach(cleanup);

describe('Testing the DisplayController component', () => {
  describe('Testing the initial render', () => {
    test('All elements get rendered', () => {
      render(<DisplayController cards={mockCards} moveTrigger={0} />);

      // correct number of cards renderd
      const renderedCards = screen.getAllByRole('card');
      expect(renderedCards.length).toBe(mockCards.length);

      // Each card has parent div.card-container
      renderedCards.forEach((card) => {
        expect(card.parentElement).toBeInTheDocument();
        expect(card.parentElement).toHaveClass('card-container');
        // All cards are contained within the gameboard
        expect(card.parentElement.parentElement).toHaveClass('gameboard');
      });
    });
  });

  describe('Testing randomisation', () => {
    test('Card order is randomised on initial render', () => {
      const { container: firstRender } = render(
        <DisplayController cards={mockCards} moveTrigger={0} />
      );
      const { container: secondRender } = render(
        <DisplayController cards={mockCards} moveTrigger={0} />
      );

      const firstCards = firstRender.querySelectorAll('.card-container');
      const secondCards = secondRender.querySelectorAll('.card-container');

      // get Ids
      const firstIds = Array.from(firstCards).map((card) => card.firstChild.id);
      const secondIds = Array.from(secondCards).map(
        (card) => card.firstChild.id
      );

      expect(firstIds).not.toEqual(secondIds);
    });

    test('Cards are randomised after user move', () => {
      const { container, rerender } = render(
        <DisplayController cards={mockCards} moveTrigger={0} />
      );
      const initialCards = container.querySelectorAll('.card-container');
      const initialIds = Array.from(initialCards).map(
        (card) => card.firstChild.id
      );

      rerender(<DisplayController cards={mockCards} moveTrigger={1} />);
      const shuffledCards = container.querySelectorAll('.card-container');
      const shuffledIds = Array.from(shuffledCards).map(
        (card) => card.firstChild.id
      );

      console.log(`initial ${initialIds}, shuffled ${shuffledIds}`);

      expect(initialIds).not.toEqual(shuffledIds);
    });
  });
});
