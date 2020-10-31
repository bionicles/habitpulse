import { reduce } from "state";
import { is } from "ramda";

var LOGGING = 1;

export const middleware = (state, action) => {
  if (LOGGING) {
    if (is(String, action)) {
      console.log("DISPATCH: ", action);
    } else {
      console.log("DISPATCH: ", ...action);
    }
  }
  const nextState = reduce(state, action);
  if (LOGGING) {
    console.log("next state:", nextState);
  }
  return nextState;
};
