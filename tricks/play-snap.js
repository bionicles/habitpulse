export const playSnap = async () => {
  var playPromise = document.querySelector("audio").play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("played snap");
      })
      .catch((e) => console.log(e));
  } else {
    console.log(playPromise);
  }
};
