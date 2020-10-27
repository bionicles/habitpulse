import { useMemo, useEffect, useCallback } from "react";
import userbase from "userbase-js";
import { useState } from "state";
import { nanoid } from "nanoid";
import * as R from "ramda";
import dayjs from "dayjs";

import { getToday } from "tricks";
import { Habit } from "components";

const getDay = (string) => string.substr(-2);

const getLastNDays = (n) =>
  R.reverse(
    [...Array(n)].map((_, i) => {
      return dayjs().subtract(i, "days").format("YYYYMMDD");
    })
  );

export const Tape = () => {
  const {
    state: { habits, nextHabit, habitPlaceholder },
    set,
  } = useState();

  console.log("HABITS:", habits);
  const today = getToday();

  const recents = useMemo(() => {
    const recents = getLastNDays(64);
    set({ recents });
    return recents;
  }, [today]);

  useEffect(() => {
    async function openDatabase() {
      try {
        console.log("opening db...");
        await userbase.openDatabase({
          databaseName: "habits",
          changeHandler: (habits) => set({ habits }),
        });
      } catch (e) {
        console.error(e.message);
      }
    }
    openDatabase();
  }, []);

  const addHabit = async (e) => {
    e.preventDefault();
    set({ disabled: true });
    try {
      await userbase.insertItem({
        databaseName: "habits",
        item: { id: nanoid(), name: nextHabit, done: false },
      });
      set({ nextHabit: "" });
      set({ disabled: true });
    } catch (e) {
      console.error(e.message);
      set({ disabled: false });
    }
  };

  const handleChange = useCallback(
    function handleChange(e) {
      e.preventDefault();
      set({ nextHabit: e.target.value });
    },
    [set]
  );

  async function deleteHabit() {
    set({ disabled: true });
    try {
      await userbase.deleteItem({
        databaseName: "habits",
        id,
      });
      set({ disabled: false });
    } catch (e) {
      console.error(e.message);
      set({ disabled: false });
    }
  }
  console.log("recents", recents);
  return (
    <div className="max-w-full overscroll-contain">
      <div>
        <div className="rtl">
          <div className="px-4 py-2">Habit</div>
          {R.map(
            (date) => (
              <div className="px-4 py-2">{getDay(date)}</div>
            ),
            recents
          )}
        </div>
      </div>
      <div className="max-w-full">
        <div>
          {R.map(
            (habit) => (
              <Habit recents={recents} habit={habit} />
            ),
            R.values(habits)
          )}
        </div>
        <div className="justify-items-end">
          <div className="box namebox px-4 py-2">
            <input
              onChange={handleChange}
              type="text"
              value={nextHabit}
              placeholder={habitPlaceholder}
            />
          </div>
          <div
            className="box checkbox btn-green text-4xl text-center px-0 py-0"
            onClick={addHabit}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};
