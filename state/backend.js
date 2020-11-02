import userbase from "userbase-js";

export const updateCloud = (state) =>
  userbase
    .updateItem({
      databaseName: "state",
      item: {
        habits: state.habits,
      },
      itemId: "state",
    })
    .then(() => {
      console.log("wrote state to userbase!");
    })
    .catch(console.error);
