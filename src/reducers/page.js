const getStoragePage = () => typeof window !== "undefined" &&
localStorage.getItem("page") ? JSON.parse(
  localStorage.getItem("page")) : {};

const initialState = getStoragePage();

const page = (state = initialState, action) => {

  switch (action.type) {
    case "SAVE_PAGE": {
      let id = action.payload.id;
      let newState = { ...state, ...{ [id]: action.payload.value } };
      let stateToStore = { ...getStoragePage(), ...{ [id]: action.payload.value } };
      localStorage.setItem("page", JSON.stringify(stateToStore));
      return newState;
    }
    case "CACHE_PAGE": {
      let id = action.payload.id;
      return { ...state, ...{ [id]: action.payload.value } };
    }
    default:
      return state;
  }
};

export default page;