import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";

import { middleware, initialState } from "state";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(middleware, initialState);
  const contextValue = useMemo(() => {
    const set = (payload) => dispatch(["SET", payload]);
    const assoc = (payload) => dispatch(["ASSOC", payload]);
    const dissoc = (payload) => dispatch(["DISSOC", payload]);
    return { state, dispatch, set, assoc, dissoc };
  }, [state, dispatch]);
  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useState = () => useContext(StateContext);

// const {dispatch} = useState();
// const {state, dispatch} = useState();
// const {state: {habits, user}, dispatch} = useState();
