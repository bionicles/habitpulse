import { useEffect } from "react";
import userbase from "userbase-js";
import { map } from "ramda";
import { useState } from "state";
import { nanoid } from "nanoid";

import { Habit } from "components";

const DateGroup = (recents) => (
  <>{map((date) => ((<th class="px-4 py-2">date</th>), recents))}</>
);

export const Table = () => {
  const {
    state: { habits, nextHabit },
    set,
  } = useState();

  const recents = useEffect(() => {
    const recents = getRecents();
    set({ recents });
  }, []);

  console.log("table recents:", recents);

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

  async function addHabit(e) {
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
  }

  function handleNextHabitChange(e) {
    e.preventDefault();
    set({ nextHabit: e.target.value });
  }

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
  return (
    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Habit</th>
          <DateGroup />
        </tr>
      </thead>
      <tbody>
        {map(
          (habit) => (
            <Habit recents={recents} habit={habit} />
          ),
          habits
        )}
        <tr>
          <td className="box namebox">
            <input
              onChange={handleNextHabitChange}
              type="text"
              value={nextHabit}
            />
          </td>
          <td className="" onChange={handleNextHabitChange}>
            <button className="btn-green">Add Habit</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;

// <tr>
//   <td class="box namebox">walk</td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
// </tr>
// <tr class="bg-gray-100">
//   <td class="box namebox">run</td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
// </tr>
// <tr>
//   <td class="box namebox">climb</td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
//   <td class="box checkbox hover:bg-green-500"></td>
// </tr>
