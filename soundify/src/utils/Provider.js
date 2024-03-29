import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const Provider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useProvider = () => useContext(StateContext);