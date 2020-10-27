import { useMemo, useEffect } from "react";
import * as R from "ramda";
import dayjs from "dayjs";

import { getToday, playSnap } from "tricks";
import { useState } from "state";

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
            className="left-side bg-white controls h-64-px namebox"
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
            <th className="left-side habit-name bg-white align-middle namebox flex h-64-px">
              <span className="delete-habit-button inline-block align-middle">
                delete
              </span>
              <h3 className="flex-grow inline-block align-middle">
                {habit.name}
              </h3>
            </th>
            {dates.map((date) => (
              <td
                className={`checkbox box cursor-pointer ${
                  habits[habit.id].completions[date] ? "bg-green-500" : null
                }`}
                onClick={() => {
                  playSnap();
                  assoc([
                    ["habits", habit.id, "completions", date],
                    habits[habit.id].completions[date] ? 0 : 1,
                  ]);
                }}
              />
            ))}
          </tr>
        ))}
        <tr className="new-habit-row">
          <th className="new-habit bg-green-600 left-side cursor-pointer p-1">
            Add Habit
          </th>
        </tr>
      </table>
    </div>
  );
};
