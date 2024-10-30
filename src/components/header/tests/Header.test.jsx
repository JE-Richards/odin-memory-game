import Header from '../Header.jsx';
import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';

const mockData = {
  title: 'HEADER',
  rules: 'Rules for the game',
  scoreboard: () => <h2>Scores</h2>,
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Header component', () => {
  describe('Testing the initial render', () => {
    test('Component renders correctly', () => {
      render(
        <Header
          title={mockData.title}
          rules={mockData.rules}
          scoreboard={mockData.scoreboard()}
        />
      );

      const headerTitle = screen.getByText(mockData.title);
      const headerInfo = headerTitle.parentElement;
      const headerRules = screen.getByText(mockData.rules);
      const headerScoreboard = screen.getByText('Scores');

      expect(headerInfo).toBeInTheDocument();
      expect(headerTitle).toBeInTheDocument();
      expect(headerTitle).toHaveClass('info__title');
      expect(headerInfo).toContainElement(headerTitle);
      expect(headerRules).toBeInTheDocument();
      expect(headerRules).toHaveClass('info__rules');
      expect(headerInfo).toContainElement(headerRules);
      expect(headerScoreboard).toBeInTheDocument();
    });
  });
});
