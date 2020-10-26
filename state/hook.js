import React, { createContext, useContext, useReducer, useMemo } from "react";
import { reduce, logger, initialState } from "state";

const LOGGING = 1;

const reducer = LOGGING ? logger : reduce;
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useState = () => useContext(StateContext);

// const {dispatch} = useState();
// const {state, dispatch} = useState();
// const {state: {habits, user}, dispatch} = useState();
