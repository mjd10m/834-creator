

const getLocalStorageState = (key) => {
    
    const savedState = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : {};

  return savedState;
}

const saveLocalStorageState = (key, state) => {
    localStorage.setItem(key, JSON.stringify(state));
}

const removeLocalStorageState = (key) => {
    localStorage.removeItem(key)
}

export {getLocalStorageState, saveLocalStorageState, removeLocalStorageState}
