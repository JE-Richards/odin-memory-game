import dataProcessor from '../dataProcessor.js';

describe('Testing dataProcessor function', () => {
  test('dataProcessor returns data when all keys are present', () => {
    const mockData = {
      id: 1,
      name: 'bulbasaur',
      sprites: {
        versions: {
          'generation-iv': {
            platinum: {
              front_default: 'Correct sprite',
            },
          },
        },
      },
    };

    const result = dataProcessor(mockData);

    expect(result).toStrictEqual({
      id: mockData.id,
      name: mockData.name,
      sprite: mockData.sprites.versions['generation-iv'].platinum.front_default,
    });
  });

  test('dataProcessor ignores non-required fields', () => {
    const mockData = {
      id: 1,
      field: 33,
      name: 'bulbasaur',
      bad: 'Not needed',
      sprites: {
        more: 'sprites here',
        versions: {
          'generation-iv': {
            test: {
              front_default: 'Incorrect sprite',
            },
            platinum: {
              front_default: 'Correct sprite',
            },
          },
        },
      },
    };

    const result = dataProcessor(mockData);

    expect(result).toStrictEqual({
      id: mockData.id,
      name: mockData.name,
      sprite: mockData.sprites.versions['generation-iv'].platinum.front_default,
    });
  });

  test('dataProcessor returns null when the sprite is missing and throws a warning', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const mockData = {
      id: 1,
      name: 'bulbasaur',
      sprites: {
        versions: {
          'generation-iv': {
            platinum: {
              back_default: 'Incorrect sprite',
            },
          },
        },
      },
    };

    const result = dataProcessor(mockData);

    expect(result).toStrictEqual({
      id: mockData.id,
      name: mockData.name,
      sprite: null,
    });
    expect(warnSpy).toHaveBeenCalledWith('Sprite not found for ID 1');
  });
});
