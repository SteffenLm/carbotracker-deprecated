import { createLocalStorageLoader } from './load-local-storage';

const getItemSpy = jest.fn();
const setItemSpy = jest.fn();

describe('local-storage-manager', () => {
  beforeAll(() => {
    global.Storage.prototype.getItem = getItemSpy;
    global.Storage.prototype.setItem = setItemSpy;
  });

  afterAll(() => {
    getItemSpy.mockReset();
    setItemSpy.mockReset();
  });

  describe('createLocalStorageLoader', () => {
    it('should return a function', () => {
      const loader = createLocalStorageLoader<string>('localStorageKey');
      expect(typeof loader).toBe('function');
    });
    it('should throw error, if item does not exist in local storage', () => {
      getItemSpy.mockReturnValue(null);

      const getParsedDataFromLocalStorage =
        createLocalStorageLoader<string>('localStorageKey');

      expect(getParsedDataFromLocalStorage).toThrowError();
    });
    it('should return a the parsed value from local storage', () => {
      const givenSavedObject = {
        dummy: 1,
      };
      getItemSpy.mockReturnValue(JSON.stringify(givenSavedObject));

      const getParsedDataFromLocalStorage =
        createLocalStorageLoader('localStorageKey');

      const parsedData = getParsedDataFromLocalStorage();
      expect(parsedData).toEqual({ dummy: 1 });
    });
  });
});
