import * as Automerge from "automerge";
import * as R from "ramda";

const PAYLOADS = {
  OPEN: { layoutMode: "MODAL" }, // OPEN / CLOSE MODAL!!
  CLOSE: { layoutMode: "" },
  CLEAR_PASSWORD: { password: "" },
};

export const reduce = (state, action) => {
  const type = R.is(String, action) ? action : action[0];
  const payload = R.is(Array, action) ? action[1] : PAYLOADS[type];
  if (type === "SET" || R.has(type, PAYLOADS)) {
    return R.mergeDeepRight(state, payload);
  } else if (type === "ASSOC") {
    const [targetPath, value] = payload;
    return R.assocPath(targetPath, value, state);
  } else if (type === "DISSOC") {
    return R.dissocPath(payload, state);
  } else {
    return state;
  }
};
