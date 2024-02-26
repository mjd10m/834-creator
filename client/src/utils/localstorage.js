

const getLocalStorageState = () => {
    
    const savedState = localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : {};

  return savedState;
}

export default getLocalStorageState
