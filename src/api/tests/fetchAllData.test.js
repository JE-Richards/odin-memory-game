import fetchAllData from '../fetchAllData.js';
import fetchData from '../fetchData.js';

jest.mock('../fetchData.js');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing the fetchAllData function', () => {
  test('fetchAllData returns data for all successful fetches', async () => {
    const mockIds = [1, 2, 3];
    const mockData = [
      { data: { id: 1, name: 'bulbasaur' }, error: null },
      { data: { id: 2, name: 'ivysaur' }, error: null },
      { data: { id: 3, name: 'venusaur' }, error: null },
    ];

    fetchData.mockImplementation((id) => {
      return Promise.resolve(mockData.find((item) => item.data.id === id));
    });

    const result = await fetchAllData(mockIds);

    expect(result).toStrictEqual({
      data: mockData.map((item) => item.data),
      errors: [],
    });
  });

  test('fetchAllData returns data and errors when some fetches fail', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const mockIds = [1, 2, 3];
    const mockData = [
      { data: { id: 1, name: 'bulbasaur' }, error: null },
      { data: null, error: 'Resource not found (404) for ID 2.' },
      { data: { id: 3, name: 'venusaur' }, error: null },
    ];

    fetchData.mockImplementation((id) => {
      return Promise.resolve(
        mockData.find(
          (item) => item.data?.id === id || item.error?.includes(`ID ${id}`)
        )
      );
    });

    const result = await fetchAllData(mockIds);

    expect(result).toStrictEqual({
      data: mockData.filter((item) => item.data).map((item) => item.data),
      errors: mockData.filter((item) => item.error).map((item) => item.error),
    });
    expect(warnSpy).toHaveBeenCalledWith(
      'Some requests failed:',
      result.errors
    );
  });

  test('fetchAllData returns only errors when all fetches fail', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const mockIds = [1, 2, 3];
    const mockData = [
      { data: null, error: 'Resource not found (404) for ID 1.' },
      { data: null, error: 'Resource not found (404) for ID 2.' },
      { data: null, error: 'Resource not found (404) for ID 3.' },
    ];

    fetchData.mockImplementation((id) => {
      return Promise.resolve(
        mockData.find(
          (item) => item.data?.id === id || item.error?.includes(`ID ${id}`)
        )
      );
    });

    const result = await fetchAllData(mockIds);

    expect(result).toStrictEqual({
      data: [],
      errors: mockData.filter((item) => item.error).map((item) => item.error),
    });
    expect(warnSpy).toHaveBeenCalledWith(
      'Some requests failed:',
      result.errors
    );
  });
});
