import { getToday } from "tricks";

export const initialState = {
  user: {
    username: "",
    password: "",
  },
  habits: [
    { id: 1, name: "walk", completions: {} },
    { id: 2, name: "run", completions: {} },
    { id: 3, name: "lift", completions: {} },
  ],
  layoutMode: "",
  formState: "SIGN_UP",
  loading: false,
  error: false,
  nextHabit: "Enter next habit...",
};
