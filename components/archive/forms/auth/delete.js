const handleDeleteUser = useCallback(() => {
  userbase
    .deleteUser()
    .then(() => {
      window.localStorage.clear();
      dispatch("RESET");
    })
    .catch((e) => console.error("handleSignOut Error:", e));
}, [userbase]);
