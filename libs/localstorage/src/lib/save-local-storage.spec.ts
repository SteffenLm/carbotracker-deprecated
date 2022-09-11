import { createLocalStorageSaver } from './save-local-storage';

const getItemSpy = jest.fn();
const setItemSpy = jest.fn();

describe('createLocalStorageSaver', () => {
  beforeAll(() => {
    global.Storage.prototype.getItem = getItemSpy;
    global.Storage.prototype.setItem = setItemSpy;
  });

  afterAll(() => {
    getItemSpy.mockReset();
    setItemSpy.mockReset();
  });

  it('should return a function', () => {
    const loader = createLocalStorageSaver<string>('localStorageKey');
    expect(typeof loader).toBe('function');
  });
  it('should stringify input value and use given local storage key', () => {
    const givenObject = ['A', 1];
    const givenLocalStorageKey = 'localStorageKey';
    const saveToLocalStorage =
      createLocalStorageSaver<(string | number)[]>(givenLocalStorageKey);

    saveToLocalStorage(givenObject);

    expect(setItemSpy).toHaveBeenCalledWith(givenLocalStorageKey, '["A",1]');
  });
});
