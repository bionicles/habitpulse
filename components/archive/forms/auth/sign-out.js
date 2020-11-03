const handleSignOut = useCallback(() => {
  if (!document || !window) return;
  userbase
    .signOut()
    .then(() => {
      set(initialState);
      window.localStorage.clear();
      window.history.pushState({}, document.title, "/");
    })
    .catch((e) => console.error("handleSignOut Error:", e));
}, [userbase]);
