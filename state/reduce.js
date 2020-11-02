import { is, has, mergeDeepRight, assocPath, dissocPath, assoc } from "ramda";
// import { getNow } from "tricks";

const PAYLOADS = {
  OPEN: { layoutMode: "MODAL" }, // OPEN / CLOSE MODAL!!
  CLOSE: { layoutMode: "" },
  CLEAR_PASSWORD: { password: "" },
  SIGNOUT: { signedIn: 0 },
  SIGNIN: { signedIn: 1 },
};

export const reduce = (state, action) => {
  const type = is(String, action) ? action : action[0];
  const payload = is(Array, action) ? action[1] : PAYLOADS[type];
  if (type === "LOAD") return payload;
  // console.log("prev.timestamp:", prev.timestamp);
  // console.log("action.timestamp:", action.timestamp);
  // if (
  //   type === "SET" &&
  //   has("timestamp", prev) &&
  //   has("timestamp", action) &&
  //   prev.timestamp == action.timestamp
  // ) {
  //   console.log("BAILED");
  //   return assoc("skipped", 1, prev);
  // }
  // const state = assocPath(["timestamp"], getNow(), prev); // maybe not on localStorage!
  let newState;
  if (type === "SET" || has(type, PAYLOADS)) {
    newState = mergeDeepRight(state, payload);
  } else if (type === "ASSOC") {
    const [targetPath, value] = payload;
    newState = assocPath(targetPath, value, state);
  } else if (type === "DISSOC") {
    newState = dissocPath(payload, state);
  } else if (type === "RESET") {
    newState = initialState;
  } else {
    same = true;
    newState = state;
  }
  return newState;
};
