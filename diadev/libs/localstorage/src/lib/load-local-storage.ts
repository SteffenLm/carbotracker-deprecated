const loadFromLocalStorage = <T>(key: string, fallBackValue: T) => {
  const savedItem = localStorage.getItem(key);
  if (savedItem !== null) {
    return JSON.parse(savedItem) as T;
  } else {
    return fallBackValue;
  }
};

export const createLocalStorageLoader: <T>(key: string) => (value: T) => T = (
  key: string
) => {
  return <T>(fallBackValue: T) => {
    return loadFromLocalStorage(key, fallBackValue);
  };
};
