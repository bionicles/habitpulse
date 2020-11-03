export const playSnap = async () => {
  if (!document) return;
  var audioElement = document.getElementById("snap-audio");
  // console.log("audioElement", audioElement);
  if (!audioElement) return;
  var playPromise = audioElement.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("played snap");
      })
      .catch(console.log);
  } else {
    console.log("playSnap playPromise:", playPromise);
  }
};
