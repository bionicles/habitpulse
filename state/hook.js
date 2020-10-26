import React, { createContext, useContext, useReducer, useMemo } from "react";
import { middleware, initialState } from "state";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(middleware, initialState);
  const set = (payload) => dispatch(["SET", payload]);
  const value = useMemo(() => {
    return { state, dispatch, set };
  }, [state, dispatch]);
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useState = () => useContext(StateContext);

// const {dispatch} = useState();
// const {state, dispatch} = useState();
// const {state: {habits, user}, dispatch} = useState();
