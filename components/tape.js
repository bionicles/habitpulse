import { useMemo, useEffect, useCallback } from "react";
import * as R from "ramda";
import dayjs from "dayjs";

import { getToday, playSnap } from "tricks";
import { useState } from "state";
import { nanoid } from "nanoid";

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
  const { set, assoc, dissoc, state } = useState();
  const { habitIds } = state;
  const today = getToday();

  const dates = useMemo(() => {
    const dates = getLastNDays(64);
    return dates;
  }, [today]);

  const addHabit = useCallback(() => {
    const newHabit = { id: nanoid(), name: "Enter a habit..." };
    set({
      habitIds: [...state.habitIds, newHabit.id],
      [newHabit.id]: newHabit,
    });
  }, [set]);

  useEffect(() => set({ dates }), [dates]);
  useEffect(handleJump, []);
  return (
    <div className="tape-wrapper" id="tape-wrapper">
      <table className="tape">
        <thead>
          <tr className="top-tape-row items-center">
            <th
              className="left-side bg-white hover:bg-gray-200 controls h-64-px namebox cursor-pointer text-2xl py-auto flex"
              onClick={handleJump}
            >
              <span className="inline-block m-auto">>> Today >></span>
            </th>
            {dates.map((date) => (
              <td className="date-box box text-center" key={date}>
                {date.substr(-2)}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {R.values(habitIds).map((habitId) => {
            const habit = state[habitId];
            return (
              <tr className="habit-row pt-2" key={habitId}>
                <th className="left-side habit-name bg-white align-middle namebox flex h-64-px">
                  <span className="delete-habit-button my-auto inline-block cursor-pointer hover:bg-gray-200">
                    delete
                  </span>
                  <div className="flex-grow inline-block cursor-grab hover:bg-gray-200 text-4xl">
                    <span className="cursor-text">{habit.name}</span>
                  </div>
                </th>
                {dates.map((date) => (
                  <td
                    className={`checkbox box cursor-pointer hover:bg-gray-200 ${
                      habit[date] ? "bg-green-500" : null
                    }`}
                    onClick={() => {
                      playSnap();
                      habit[date]
                        ? dissoc([habitId, date])
                        : assoc([[habitId, date], 1]);
                    }}
                    key={`${habitId}-${date}`}
                  />
                ))}
              </tr>
            );
          })}
          <tr className="new-habit-row">
            <th className="new-habit left-side cursor-pointer p-1">
              <button className="btn-green" onClick={addHabit}>
                Add Habit
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
