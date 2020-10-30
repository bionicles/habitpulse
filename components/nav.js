import { useCallback } from "react";
import { useState } from "state";

export const Nav = () => {
  const {
    dispatch,
    state: { user, layoutMode },
  } = useState();

  return (
    <nav className="flex block h-42-px items-center w-screen bordered">
      <div className="flex-grow p-2 centered text-xl items-center">
        HabitPulse
      </div>
    </nav>
  );
};
