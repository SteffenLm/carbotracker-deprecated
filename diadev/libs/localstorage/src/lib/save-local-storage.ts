const saveToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const createLocalStorageSaver: <T>(key: string) => (value: T) => void = (
  key: string,
) => {
  return <T>(value: T) => {
    saveToLocalStorage(key, value);
  };
};
