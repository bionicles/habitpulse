import userbase from "userbase-js";
import { useMemo } from "react";
import { map, has } from "ramda";

import { CheckBox } from "components";

const calculateGreens = (recents, completions) =>
  map((recent) => has(recent, completions), recents);

export const Habit = ({ recents, habit: { id, name, completions } }) => {
  const maybeGreens = useMemo(() => calculateGreens(recents, completions), [
    recents,
    completions,
  ]);
  return (
    <div classname="habit max-w-full flex flex-row-reverse rtl">
      <div className="namebox flex-shrink box">
        <span>{name}</span>
      </div>
      {map(
        (date) => (
          <CheckBox habitId={id} date={date} />
        ),
        recents
      )}
    </div>
  );
};
