import { mergeDeepRight, is, evolve, has, toUpper } from "ramda";

const PAYLOADS = {
  OPEN: { layoutMode: "MODAL" }, // OPEN / CLOSE MODAL!!
  CLOSE: { layoutMode: "" },
  SHOW: { layoutMode: "ALERT" }, // SHOW / HIDE ALERT!!
  HIDE: { layoutMode: "" },
  SIGN_IN: { signedIn: 1 },
  SIGN_OUT: { signedIn: 0 },
  CLEAR_PASSWORD: { password: "" },
  CLEAR_FEEDBACK: {
    satisfied: false,
    score: 42,
    feedback: "",
    isPrivate: false,
  },
  PRINT_MONEY: {
    balance: (amount) => amount * 2,
    name: toUpper,
  },
};

() => dispatch("OPEN");

export const reduce = (state, action) => {
  const type = is(String, action) ? action : action[0];
  const payload = is(Array, action) ? action[1] : PAYLOADS[type];
  if (type === "SET" || has(type, PAYLOADS)) {
    return mergeDeepRight(state, payload);
  } else if (type === "EVOLVE") {
    return evolve(state, payload);
  } else {
    return state;
  }
};
