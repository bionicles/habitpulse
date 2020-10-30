import { useMemo, useEffect, useCallback } from "react";
import * as R from "ramda";
import dayjs from "dayjs";

import { getToday, playSnap } from "tricks";
import { useState } from "state";
import { nanoid } from "nanoid";

const handleScroll = (e) => {
  const x = e.target.scrollLeft;
  const scrollRows = document.getElementsByClassName("scroll");
  R.forEach((row) => (row.scrollLeft = x), scrollRows);
};

const handleJump = () => {
  const scrollRows = document.getElementsByClassName("scroll");
  R.forEach((row) => (row.scrollLeft = 9001), scrollRows);
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

  useEffect(() => window.addEventListener("scroll", handleScroll, true), []);

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
    <div className="tape-wrapper my-2" id="tape-wrapper">
      <table className="tape">
        <thead>
          <tr className="top-tape-row items-center">
            <th className="left-side cursor-default bordered bg-white controls h-64-px text-xl py-auto flex items-center justify-center">
              <button className="btn-green bordered" onClick={addHabit}>
                Add Habit
              </button>
              <button
                className="btn-green bordered inline-block cursor-pointer"
                onClick={handleJump}
              >
                Today
              </button>
              <button className="btn-green bordered" onClick={openModal}>
                Sync
              </button>
            </th>
            <th className="right-side scroll">
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
            </th>
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
                    x
                  </button>
                  <div className="flex inline-block cursor-grab hover:bg-gray-200 text-xl">
                    <input
                      className="cursor-text hover:bg-gray-200 m-auto bordered"
                      onClick={handleNameClick}
                      name={habitId}
                      value={habit.name}
                      onChange={updateHabit}
                      size="16"
                    />
                  </div>
                </th>
                <th className="right-side no-scrollbar scroll ">
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
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
