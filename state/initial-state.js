import { getToday } from "tricks";

export const initialState = {
  user: {
    username: "",
    password: "",
  },
  habits: {
    1: { id: 1, name: "walk", completions: {} },
    2: { id: 2, name: "run", completions: {} },
    3: { id: 3, name: "lift", completions: {} },
  },
  layoutMode: "",
  formState: "SIGN_UP",
  loading: false,
  error: false,
  nextHabit: "",
  habitPlaceholder: "Enter next habit...",
};
