import { useCallback } from "react";

import { useState } from "state";

export const CheckBox = ({ habitId, date }) => {
  const {
    assoc,
    state: {
      habits: {
        [habitId]: {
          completions: { [date]: completed },
        },
      },
    },
  } = useState();
  const handleClick = useCallback((e) => {
    assocPath([["habits", habitId, "completions", date], 1]);
  });
  return (
    <div
      className={`${completed ? "bg-green-500" : null} box checkbox flex-none`}
      onClick={handleClick}
    />
  );
};
