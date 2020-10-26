import { useEffect } from "react";
import userbase from "userbase-js";

import { useState } from "state";

export const Modal = () => {
  const {
    state: {
      formState,
      user: { username, password },
      loading,
      error,
    },
    dispatch,
  } = useState();

  useEffect(() => {
    dispatch(["SET", { error: "" }]);
  }, [formState]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(["SET", { loading: true }]);
    try {
      const user = await userbase.signUp({
        username,
        password,
        rememberMe: "none",
      });
      dispatch(["SET", { user, loading: false, layoutMode: "" }]);
    } catch (e) {
      dispatch(["SET", { loading: false, error: e.message }]);
    }
  };

  async function handleLogIn(e) {
    e.preventDefault();
    dispatch(["SET", { loading: true }]);
    try {
      const user = await userbase.signIn({
        username,
        password,
        rememberMe: "none",
      });
      dispatch(["SET", { user, loading: false, toggle: false }]);
    } catch (e) {
      dispatch(["SET", { loading: false, error: e.message }]);
    }
  }

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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => dispatch(["SET", { password: e.target.value }])}
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
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => dispatch(["SET", { password: e.target.value }])}
        />
      </div>
      <div className="flex items-center justify-between">
        <span
          className="font-bold cursor-pointer"
          onClick={() => dispatch(["SET", { layoutMode: "" }])}
        >
          Cancel
        </span>
        {formState === "LOG_IN" ? (
          <button
            disabled={loading}
            className="btn-yellow"
            onClick={handleLogIn}
          >
            {loading ? "Logging In ..." : "Log In"}
          </button>
        ) : (
          <button
            disabled={loading}
            className="btn-yellow"
            onClick={handleSignUp}
          >
            {loading ? "Signing up ..." : "Sign Up"}
          </button>
        )}
      </div>
      <p className="text-red-500 font-bold">{error}</p>
    </form>
  );
};
