import { useEffect, useCallback } from "react";
import userbase from "userbase-js";

import { useState, initialState } from "state";

export const Modal = () => {
  const {
    state: { username, password, loading, error },
    set,
    dispatch,
  } = useState();

  const handleChange = useCallback(
    (e) => set({ [e.target.name]: e.target.value }),
    [set]
  );

  const handleSignUp = async (e) => {
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

  const handleSignIn = useCallback(async (e) => {
    e.preventDefault();
    set({ loading: true });
    const user = userbase
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
          set({ loading: false, error: e.message });
        }
      });
  });

  const handleSignOut = useCallback(() => {
    userbase
      .signOut()
      .then(() => {
        set(initialState);
        window.localStorage.clear();
      })
      .catch((e) => console.error("handleSignOut Error:", e));
  }, [userbase]);

  const handleDeleteUser = useCallback(() => {
    userbase
      .deleteUser()
      .then(() => {
        window.localStorage.clear();
        dispatch("RESET");
      })
      .catch((e) => console.error("handleSignOut Error:", e));
  }, [userbase]);

  return (
    <form className="bg-white shadow-md rounded p-8">
      <div className="mb-4">
        <label
          className="block text-purple-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-purple-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          placeholder="*******"
          value={password}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <span
          className="font-bold cursor-pointer"
          onClick={() => set({ layoutMode: "" })}
        >
          Cancel
        </span>
        <div className="button-group">
          <button
            disabled={loading}
            className="bordered btn-green"
            onClick={handleSignIn}
          >
            {loading ? "Running..." : "Sign In"}
          </button>
          <button
            disabled={loading}
            className="bordered btn-green"
            onClick={handleSignUp}
          >
            {loading ? "Running..." : "Sign Up"}
          </button>
          <button
            disabled={loading}
            className="bordered btn-red"
            onClick={handleSignOut}
          >
            {loading ? "Running..." : "Sign Out"}
          </button>
          <button
            disabled={loading}
            className="bordered btn-red"
            onClick={handleDeleteUser}
          >
            {loading ? "Running..." : "Delete Account"}
          </button>
        </div>
      </div>
      <p className="text-red-500 font-bold">{error}</p>
    </form>
  );
};
