import { createLocalStorageSaver } from '@diadev/localstorage';

let getItemSpy = jest.fn();
let setItemSpy = jest.fn();

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
    const givenObject = {
      dummy: 1,
    };
    const givenLocalStorageKey = 'localStorageKey';
    const saveToLocalStorage =
      createLocalStorageSaver<any>(givenLocalStorageKey);

    saveToLocalStorage(givenObject);

    expect(setItemSpy).toHaveBeenCalledWith(
      givenLocalStorageKey,
      '{"dummy":1}',
    );
  });
  xit('should return a the parsed value from local storage', () => {
    const givenSavedObject = {
      dummy: 1,
    };
    getItemSpy.mockReturnValue(JSON.stringify(givenSavedObject));

    const getParsedDataFromLocalStorage =
      createLocalStorageSaver('localStorageKey');

    const parsedData = getParsedDataFromLocalStorage('');
    expect(parsedData).toEqual({ dummy: 1 });
  });
});
