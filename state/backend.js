import userbase from "userbase-js";

export const updateCloud = ({ habits }) => {
  // if (state.connected) {
  userbase
    .updateItem({
      databaseName: "state",
      item: { habits },
      itemId: "state",
    })
    .then(() => {
      console.log("wrote state to userbase!");
    })
    .catch(console.error);
  // } else {
  //   console.log("skip db update because not connected");
  // }
};
