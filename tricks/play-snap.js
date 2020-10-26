const playSnap = async () => {
  var playPromise = document.querySelector("audio").play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        log("played snap");
      })
      .catch((e) => log(e));
  } else {
    log(playPromise);
  }
};

export default playSnap;
