const loadFromLocalStorage = <T>(key: string) => {
  const savedItem = localStorage.getItem(key);
  if (savedItem !== null) {
    return JSON.parse(savedItem) as T;
  } else {
    throw new Error(`No value for key ${key} exists!`);
  }
};

export const createLocalStorageLoader: <T>(key: string) => () => T = (
  key: string,
) => {
  return <T>() => {
    return loadFromLocalStorage<T>(key);
  };
};
