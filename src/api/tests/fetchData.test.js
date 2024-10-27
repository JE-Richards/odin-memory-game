import fetchData from '../fetchData.js';

global.fetch = jest.fn();

afterEach(() => {
  fetch.mockClear();
});

describe('Testing the fetchData function', () => {
  describe('Testing successful data fetch', () => {
    test('fetchData returns data on a successful fetch', async () => {
      const mockData = { id: 1, name: 'bulbasaur' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchData(1);
      expect(result).toStrictEqual({ data: mockData, error: null });
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/1/'
      );
    });
  });

  describe('Testing error messages', () => {
    test('fetchData returns the 404 error message when resource is not found', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await fetchData(99999);
      expect(result).toStrictEqual({
        data: null,
        error: 'Resource not found (404) for ID 99999.',
      });
    });

    test('fetchData returns the 500 error message on server error', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await fetchData(1);
      expect(result).toStrictEqual({
        data: null,
        error:
          'Server error (500) when requesting data for ID 1. Please try again later.',
      });
    });

    test('fetchData returns the 503 error message on a service unavailable error', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
      });

      const result = await fetchData(1);
      expect(result).toStrictEqual({
        data: null,
        error:
          'Service unavailable (503) when requesting data for ID 1. Please try again later.',
      });
    });

    test('fetchData handles unexpected errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network Error'));

      const result = await fetchData(1);
      expect(result).toStrictEqual({
        data: null,
        error: 'Unexpected error fetching ID 1: Error: Network Error',
      });
    });
  });
});
