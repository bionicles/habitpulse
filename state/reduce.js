import * as R from "ramda";
import { getNow } from "tricks";

const PAYLOADS = {
  OPEN: { layoutMode: "MODAL" }, // OPEN / CLOSE MODAL!!
  CLOSE: { layoutMode: "" },
  CLEAR_PASSWORD: { password: "" },
  SIGNOUT: { signedIn: 0 },
  SIGNIN: { signedIn: 1 },
};

export const reduce = (noTimeStampState, action) => {
  const type = R.is(String, action) ? action : action[0];
  const payload = R.is(Array, action) ? action[1] : PAYLOADS[type];
  const state = R.assoc("timestamp", getNow(), noTimeStampState);
  let newState, unchanged;
  if (type === "SET" || R.has(type, PAYLOADS)) {
    newState = R.mergeDeepRight(state, payload);
  } else if (type === "ASSOC") {
    const [targetPath, value] = payload;
    newState = R.assocPath(targetPath, value, state);
  } else if (type === "DISSOC") {
    newState = R.dissocPath(payload, state);
  } else if (type === "RESET") {
    newState = initialState;
  } else {
    same = true;
    newState = state;
  }
  return newState;
};
