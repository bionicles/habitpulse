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

const handleNameClick = (e) => e.target.select();

export const Tape = () => {
  const { dispatch, set, assoc, dissoc, state } = useState();
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

  const deleteHabit = useCallback(
    (e) => {
      console.log(e.target.name);
      const newHabitIds = R.filter((x) => x != e.target.name, habitIds);
      console.log("newHabitIds: ", newHabitIds);
      set({
        habitIds: newHabitIds,
        [e.target.name]: undefined,
      });
    },
    [habitIds, dissoc]
  );

  const updateHabit = useCallback(
    (e) => assoc([[e.target.name, "name"], e.target.value]),
    [assoc]
  );
  const openModal = useCallback(() => dispatch("OPEN"), [dispatch]);

  useEffect(() => set({ dates }), [dates]);
  useEffect(handleJump, []);
  return (
    <div className="tape-wrapper" id="tape-wrapper">
      <table className="tape">
        <thead>
          <tr className="top-tape-row items-center">
            <th className="left-side cursor-default bg-white hover:bg-gray-200 controls h-64-px text-2xl py-auto flex">
              <button className="btn-green bordered" onClick={addHabit}>
                Add Habit
              </button>
              <button
                className="btn-green bordered inline-block m-auto cursor-pointer"
                onClick={handleJump}
              >
                Today
              </button>
              <button className="btn-green bordered" onClick={openModal}>
                Sync
              </button>
            </th>
            {dates.map((date) => (
              <td
                className={`date-box box text-center cursor-default select-none ${
                  date == today ? "green" : null
                }`}
                key={date}
              >
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
                <th className="left-side habit-name bg-white align-middle namebox flex h-64-px hover:bg-gray-200">
                  <button
                    className="delete-habit-button bordered btn hover:bg-red-400 my-auto inline-block cursor-pointer hover:bg-gray-200"
                    onClick={deleteHabit}
                    name={habitId}
                  >
                    delete
                  </button>
                  <div className="flex-grow flex inline-block cursor-grab hover:bg-gray-200 text-2xl">
                    <input
                      className="cursor-text hover:bg-gray-200 m-auto bordered text-right px-4"
                      onClick={handleNameClick}
                      name={habitId}
                      value={habit.name}
                      onChange={updateHabit}
                    />
                  </div>
                </th>
                {dates.map((date) => (
                  <td
                    className={`checkbox box cursor-pointer hover:bg-gray-200 ${
                      habit[date] ? "bg-green-500 hover:bg-green-500" : null
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
        </tbody>
      </table>
    </div>
  );
};
