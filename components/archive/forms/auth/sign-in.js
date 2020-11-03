const handleSignIn = useCallback(async (e) => {
  console.log("handleSignIn");
  e.preventDefault();
  set({ loading: true });
  userbase
    .signIn({
      username,
      password,
      rememberMe: "local",
    })
    .then((user) =>
      set({
        user,
        password: "",
        signedIn: 1,
        loading: false,
        layoutMode: "",
      })
    )
    .catch((e) => {
      if (e.message == "Already signed in.") {
        set({ layoutMode: "", signedIn: 1, loading: false });
      } else {
        console.error(e);
        set({ loading: false, error: e.message });
      }
    });
});
