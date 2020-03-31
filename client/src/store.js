import React, { createContext, useReducer } from "react";

const initialState = {
  user: null
};

const actions = {
  SET_USER: "SET_USER",
  CLEAR_USER: "CLEAR_USER"
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_USER:
      window.localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case actions.CLEAR_USER:
      window.localStorage.removeItem("user");
      return { ...state, user: null };
    default:
      return state;
  }
}

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider, actions };
