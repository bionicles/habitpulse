import userbase from "userbase-js";
import { useMemo } from "react";
import { map } from "ramda";

async function toggleComplete(itemId, currentValue) {
  try {
    await userbase.updateItem({
      databaseName: "next-userbase-todos",
      item: { ...currentValue, done: !currentValue.done },
      itemId,
    });
  } catch (e) {
    console.error(e.message);
  }
}

const CheckBox = ({ green }) => {
  const completed = useMemo(() => {}, [date]);
  return <td className={`box checkbox ${green ? "bg-green-500" : null}`}></td>;
};

export const Habit = ({ recents, habit: { id, name, completions } }) => {
  console.log("recents", recents);
  const maybeGreens = useMemo(map(completions.contains, recents), [
    recents,
    completions,
  ]);
  return (
    <tr>
      <td className="box namebox">{name}</td>
      {map(
        (maybeGreen) => (
          <CheckBox green={maybeGreen} />
        ),
        maybeGreens
      )}
    </tr>
  );
};
