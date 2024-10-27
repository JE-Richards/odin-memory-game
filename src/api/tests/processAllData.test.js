import processAllData from '../processAllData.js';
import dataProcessor from '../dataProcessor.js';

jest.mock('../dataProcessor.js');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing the processAllData function', () => {
  test('fetchAllData maps all raw data in an array to an array of processed data', () => {
    const mockRawData = [
      {
        id: 1,
        name: 'bulbasaur',
        sprites: 'test_sprite',
        bad: 'not needed',
      },
      { id: 2, name: 'ivysaur', sprites: 'ivy_sprite', bad: 'not needed' },
    ];

    const mockProcessedData = [
      {
        id: 1,
        name: 'bulbasaur',
        sprite: 'test_sprite',
      },
      { id: 2, name: 'ivysaur', sprite: 'ivy_sprite' },
    ];

    dataProcessor.mockImplementation((data) => ({
      id: data.id,
      name: data.name,
      sprite: data.sprites,
    }));

    const result = processAllData(mockRawData);

    expect(result).toStrictEqual(mockProcessedData);
    expect(dataProcessor).toHaveBeenCalledTimes(mockRawData.length);
    expect(dataProcessor).toHaveBeenNthCalledWith(1, mockRawData[0]);
    expect(dataProcessor).toHaveBeenNthCalledWith(2, mockRawData[1]);
  });
});
