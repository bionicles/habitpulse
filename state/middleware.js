import { reduce } from "state";
import { is } from "ramda";

var LOGGING = 1;
var SYNCING = 0;

// const log = (x) => (LOGGING ? console.log(x) : (x) => x);
// async function toggleComplete(itemId, currentValue) {
//   try {
//     await userbase.updateItem({
//       databaseName: "next-userbase-todos",
//       item: { ...currentValue, done: !currentValue.done },
//       itemId,
//     });
//   } catch (e) {
//     console.error(e.message);
//   }
// }

export const middleware = (state, action) => {
  if (LOGGING) {
    if (is(String, action)) {
      console.log("DISPATCH: ", action);
    } else {
      console.log("DISPATCH: ", ...action);
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
    console.log("next state:", nextState);
  }
  return nextState;
};
