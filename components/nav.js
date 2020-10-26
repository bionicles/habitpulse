import { useCallback } from "react";
import { useState } from "state";

export const Nav = () => {
  const {
    dispatch,
    state: { user, layoutMode },
  } = useState();

  const openModal = useCallback(() => dispatch("OPEN"), [dispatch]);

  return (
    <nav className="flex block h-42-px items-center w-screen border-b-2 border-black">
      <div className="flex-grow p-4 centered text-xl items-center">
        HabitPulse
      </div>
      <ul className="flex-shrink flex justify-end items-center p-4">
        <li>
          <button className="btn-green mx-2" onClick={openModal}>
            Save & Sync
          </button>
        </li>
      </ul>
    </nav>
  );
};
