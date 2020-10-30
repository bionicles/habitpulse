import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useMemo, useEffect, useCallback } from "react";
import * as R from "ramda";
import dayjs from "dayjs";

import { getToday, playSnap } from "tricks";
import { useState } from "state";
import { nanoid } from "nanoid";

var NUM_DAYS = 32;

const handleScroll = (e) =>
  R.forEach(
    (row) => (row.scrollLeft = e.target.scrollLeft),
    document.getElementsByClassName("scroll")
  );

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

const reorder = (list, startIndex, endIndex) => {
  const arr = Array.from(list);
  const [removed] = arr.splice(startIndex, 1);
  arr.splice(endIndex, 0, removed);
  return arr;
};

export const Tape = () => {
  const { dispatch, set, assoc, dissoc, state } = useState();
  const { habitIds } = state;
  const today = getToday();

  const dates = useMemo(() => {
    const dates = getLastNDays(NUM_DAYS);
    return dates;
  }, [today]);

  useEffect(() => window.addEventListener("scroll", handleScroll, true), []);
  const triggerScroll = useCallback(() => {
    const dateRow = document.getElementById("date-row");
    const simulatedScrollEvent = new Event("scroll");
    dateRow.dispatchEvent(simulatedScrollEvent);
  }, []);
  useEffect(triggerScroll, [habitIds]);

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

  const onDragEnd = useCallback(
    (e) => {
      if (!e.destination) return;
      set({ habitIds: reorder(habitIds, e.source.index, e.destination.index) });
    },
    [set]
  );

  const openModal = useCallback(() => dispatch("OPEN"), [dispatch]);

  useEffect(() => set({ dates }), [dates]);
  useEffect(handleJump, []);
  return (
    <div className="tape-wrapper my-2" id="tape-wrapper">
      <table className="tape">
        <thead>
          <tr className="top-row flex">
            <th className="left-side cursor-default bordered bg-white controls h-64-px text-xl flex items-center justify-center">
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
            <td className="date-row right-side scroll flex p-0">
              {dates.map((date) => (
                <td
                  className={`date-box box inline-block text-center cursor-default select-none ${
                    date == today ? "green" : null
                  }`}
                  key={date}
                >
                  {date.substr(-2)}
                </td>
              ))}
            </td>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {R.values(habitIds).map((habitId, index) => {
                  const habit = state[habitId];
                  return (
                    <Draggable
                      key={habitId}
                      draggableId={`${habitId}`}
                      index={index}
                    >
                      {(provided2) => (
                        <tr
                          className="habit-row flex"
                          key={habitId}
                          ref={provided2.innerRef}
                          {...provided2.draggableProps}
                          {...provided2.dragHandleProps}
                        >
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
                          <ul
                            className="date-row right-side no-scrollbar flex scroll p-0"
                            id="date-row"
                          >
                            {dates.map((date) => (
                              <li
                                className={`checkbox box inline-block cursor-pointer hover:bg-gray-200 ${
                                  habit[date]
                                    ? "bg-green-500 hover:bg-green-500"
                                    : null
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
                          </ul>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </div>
  );
};
