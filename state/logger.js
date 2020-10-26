import { reduce } from "state";
import { is } from "ramda";

export const logger = (s, a) => {
  if (is(String, a)) {
    console.log("DISPATCH: ", a);
  } else {
    console.log("DISPATCH: ", ...a);
  }
  const s2 = reduce(s, a);
  console.log("state after", s2);
  return s2;
};
