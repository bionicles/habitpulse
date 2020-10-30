import { useCallback } from "react";
import { useState } from "state";

export const Nav = () => {
  const {
    dispatch,
    state: { user, layoutMode },
  } = useState();

  const openModal = useCallback(() => dispatch("OPEN"), [dispatch]);

  return (
    <nav className="flex block h-42-px items-center w-screen border-b-1 border-black">
      <div className="flex-grow p-2 centered text-xl items-center">
        HabitPulse
      </div>
      <ul className="flex-shrink flex justify-end items-center">
        <li>
          <button className="btn-green bordered" onClick={openModal}>
            Save & Sync
          </button>
        </li>
      </ul>
    </nav>
  );
};
