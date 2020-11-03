const handleSignUp = async (e) => {
  console.log("handleSignUp");
  e.preventDefault();
  set({ loading: true });
  try {
    const user = await userbase.signUp({
      username,
      password,
      rememberMe: "local",
    });
    set({
      user,
      password: "",
      signedIn: 1,
      loading: false,
      layoutMode: "",
    });
  } catch (e) {
    set({ loading: false, error: e.message });
  }
};
