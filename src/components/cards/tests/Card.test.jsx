import Card from '../Card.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const mockData = {
  id: 1,
  name: 'bulbasaur',
  image: 'https://imageurl.com/img.png',
};

const mockMissingData = {
  id: 2,
  name: 'ivysaur',
  image: null,
};

const mockClickFn = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Card component', () => {
  describe('Testing initial render', () => {
    test('Component renders correctly with an image', () => {
      render(
        <Card
          id={mockData.id}
          name={mockData.name}
          image={mockData.image}
          onCardClick={mockClickFn}
        />
      );

      const cardTitle = screen.getByText(mockData.name);
      const card = cardTitle.closest('div');
      const image = screen.getByRole('img', {
        name: `Sprite artwork for the pokemon ${mockData.name}`,
      });
      const imageContainer = image.parentElement;

      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('card');
      expect(cardTitle).toBeInTheDocument();
      expect(cardTitle).toHaveClass('card__title');
      expect(card).toContainElement(cardTitle);
      expect(image).toBeInTheDocument();
      expect(image).toHaveClass('card__img');
      expect(image).toHaveAttribute('src', mockData.image);
      expect(image).toHaveAttribute(
        'alt',
        `Sprite artwork for the pokemon ${mockData.name}`
      );
      expect(card).toContainElement(image);
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass('card__img-container');
      expect(imageContainer).toContainElement(image);
      expect(card).toContainElement(imageContainer);
    });

    test('Component renders correctly without an image', () => {
      render(
        <Card
          id={mockMissingData.id}
          name={mockMissingData.name}
          image={mockMissingData.image}
          onCardClick={mockClickFn}
        />
      );

      const cardTitle = screen.getByText(mockMissingData.name);
      const card = cardTitle.closest('div');
      const missingImage = screen.getByText(
        `${mockMissingData.name} sprite is unavailable.`
      );
      const imageContainer = missingImage.parentElement;

      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('card');
      expect(cardTitle).toBeInTheDocument();
      expect(cardTitle).toHaveClass('card__title');
      expect(card).toContainElement(cardTitle);
      expect(missingImage).toBeInTheDocument();
      expect(missingImage).toHaveClass('card__img--missing');
      expect(card).toContainElement(missingImage);
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass('card__img-container');
      expect(imageContainer).toContainElement(missingImage);
    });
  });

  describe('Testing card click functionality', () => {
    test('Clicking on Card instance fires the onClick function', () => {
      render(
        <Card
          id={mockData.id}
          name={mockData.name}
          image={mockData.image}
          onCardClick={mockClickFn}
        />
      );

      const cardTitle = screen.getByText(mockData.name);
      const card = cardTitle.closest('div');

      fireEvent.click(card);

      expect(mockClickFn).toHaveBeenCalledTimes(1);
      expect(mockClickFn).toHaveBeenCalledWith(mockData.id);
    });
  });
});
