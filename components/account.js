import { useCallback } from "react";
import userbase from "userbase-js";

import { redButton, greenButton, Text } from "components";
import { useState, initialState } from "state";

export const Account = () => {
  const {
    state: {
      username,
      email,
      password,
      currentPassword,
      newPassword,
      running,
      signedIn,
    },
    set,
    dispatch,
  } = useState();

  const handleError = useCallback(
    (e) => {
      console.log(e);
      set({ running: "", message: e.message });
    },
    [set]
  );

  const handleSignUp = async (e) => {
    console.log("handleSignUp");
    e.preventDefault();
    set({ running: "SIGN_UP" });
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
        running: "",
        layoutMode: "",
      });
    } catch (e) {
      handleError(e);
    }
  };

  const handleSignIn = useCallback(async (e) => {
    console.log("handleSignIn");
    e.preventDefault();
    set({ running: "SIGN_IN" });
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
          running: "",
          layoutMode: "",
        })
      )
      .catch((e) => {
        if (e.message == "Already signed in.") {
          set({ layoutMode: "", signedIn: 1, running: "" });
        } else {
          handleError(e);
        }
      });
  });

  const handleForgot = useCallback(() => {
    if (!document || !window) return;
    set({ running: "FORGOT" });
    userbase
      .forgotPassword({
        username,
      })
      .then(() => {
        map(dispatch, [
          [
            "SET",
            {
              alertHead: "Temporary Password Sent",
              alertMessage: "Check registered email for temporary password!",
              alertColor: "green",
            },
          ],
          "CLOSE",
          "SHOW",
        ]);
      })
      .catch(handleError);
  }, [userbase]);

  const handleSignOut = useCallback(() => {
    if (!document || !window) return;
    set({ running: "SIGN_OUT" });
    userbase
      .signOut()
      .then(() => {
        set(initialState);
        window.localStorage.clear();
        window.history.pushState({}, document.title, "/");
      })
      .catch(handleError);
  }, [userbase]);

  const handleUpdateUser = useCallback(() => {
    set({ running: "UPDATE" });
    userbase
      .updateUser({
        username,
        currentPassword,
        newPassword,
        email,
      })
      .then(() => set({ running: "" }))
      .catch((e) => {
        console.log(e);
        set({ running: "", message: e.message });
      });
  });

  const handleDeleteUser = useCallback(() => {
    userbase
      .deleteUser()
      .then(() => {
        window.localStorage.clear();
        dispatch("RESET");
      })
      .catch((e) => console.log("handleSignOut Error:", e));
  }, [userbase]);

  return (
    <form className="bg-white shadow-md rounded p-6 w-full min-w-md max-w-md">
      <Text
        dispatch={dispatch}
        name="username"
        value={username}
        labelText="Username"
      />
      <Text dispatch={dispatch} name="email" value={email} labelText="Email" />
      {signedIn ? (
        <>
          <Text
            dispatch={dispatch}
            name="currentPassword"
            value={currentPassword}
            labelText="Current Password"
          />
          <Text
            dispatch={dispatch}
            name="newPassword"
            value={newPassword}
            labelText="New Password"
          />
        </>
      ) : (
        <Text
          dispatch={dispatch}
          name="password"
          value={password}
          labelText="Password"
        />
      )}

      <div className="button-group">
        {signedIn ? (
          <>
            <button
              disabled={running}
              className={`bordered ${greenButton}`}
              onClick={handleUpdateUser}
            >
              {running == "UPDATE" ? "Running..." : "Update"}
            </button>
            <button
              disabled={running}
              className={`bordered ${redButton}`}
              onClick={handleSignOut}
            >
              {running == "SIGN_OUT" ? "Running..." : "Sign Out"}
            </button>
            <button
              disabled={running}
              className={`bordered ${redButton}`}
              onClick={handleDeleteUser}
            >
              {running == "DELETE" ? "Running..." : "Delete Account"}
            </button>
          </>
        ) : (
          <>
            <button
              disabled={running}
              className={`bordered ${greenButton}`}
              onClick={handleSignIn}
            >
              {running == "SIGN_IN" ? "Running..." : "Sign In"}
            </button>
            <button
              disabled={running}
              className={`bordered ${greenButton}`}
              onClick={handleSignUp}
            >
              {running == "SIGN_UP" ? "Running..." : "Sign Up"}
            </button>
            <button
              disabled={running}
              className={`bordered ${greenButton}`}
              onClick={handleForgot}
            >
              {running == "FORGOT" ? "Running..." : "Forgot"}
            </button>
          </>
        )}
      </div>
    </form>
  );
};
