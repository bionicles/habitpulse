import { reduce } from "state";
import { is } from "ramda";

var LOGGING = 1;
var SYNCING = 0;

const log = (x) => (LOGGING ? console.log(x) : (x) => x);

export const middleware = (state, action) => {
  if (LOGGING) {
    if (is(String, action)) {
      log("DISPATCH: ", action);
    } else {
      log("DISPATCH: ", ...action);
    }
  }
  const nextState = reduce(state, action);
  if (SYNCING) {
    userbase
      .updateItem({
        databaseName: "app-state",
        item: nextState,
        itemId: "420",
      })
      .then(() => {
        console.log("successfully saved");
      })
      .catch((e) => console.error(e));
  }
  if (LOGGING) {
    log("next state:", nextState);
  }
  return nextState;
};
