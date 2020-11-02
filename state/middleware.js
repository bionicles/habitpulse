import { reduce } from "state";
import { equals, is } from "ramda";
import { updateCloud } from "./backend";

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
  if (!equals(state.habits, nextState.habits)) {
    updateCloud(nextState);
  }
  if (LOGGING) {
    console.log("next state:", nextState);
  }
  return nextState;
};
