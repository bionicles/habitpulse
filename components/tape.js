import { useMemo, useEffect } from "react";
import * as R from "ramda";
import dayjs from "dayjs";

import { useState } from "state";
import { getToday } from "tricks";

const handleJump = () => {
  var tapeWrapper = document.getElementById("tape-wrapper");
  console.log("tapeWrapper.outerWidth", tapeWrapper.outerWidth);
  tapeWrapper.scrollLeft = 9001;
};

const getLastNDays = (n) =>
  R.reverse(
    [...Array(n)].map((_, i) => {
      return dayjs().subtract(i, "days").format("YYYYMMDD");
    })
  );

export const Tape = () => {
  const {
    set,
    assoc,
    state: { habits, newHabit },
  } = useState();

  const today = getToday();

  const dates = useMemo(() => {
    const dates = getLastNDays(64);
    set({ dates });
    return dates;
  }, [today]);

  useEffect(handleJump, []);

  return (
    <div className="tape-wrapper" id="tape-wrapper">
      <table className="tape">
        <tr className="top-tape-row items-center">
          <th
            className="left-side controls h-64-px namebox"
            onClick={handleJump}
          >
            Today
          </th>
          {dates.map((date) => (
            <td className="date-box box">{date.substr(-2)}</td>
          ))}
        </tr>
        {R.values(habits).map((habit) => (
          <tr className="habit-row pt-2" habit={habit}>
            <th className="left-side habit-name align-middle namebox flex h-64-px">
              <span className="delete-habit-button inline-block align-middle">
                delete
              </span>
              <h3 className="flex-grow inline-block align-middle">
                {habit.name}
              </h3>
            </th>
            {dates.map((date) => (
              <td
                className="checkbox box"
                onClick={() => {
                  assoc(["habits", habit.id, "completions", date], 1);
                }}
              />
            ))}
          </tr>
        ))}
        <tr className="new-habit-row">
          <th
            className="new-habit namebox"
            placeholder="Enter a habit..."
            value={newHabit}
            onChange={(e) => set({ newHabit: e.target.value })}
          />
          <h3>{newHabit}</h3>
          <td className="add-habit-button">+</td>
        </tr>
      </table>
    </div>
  );
};
