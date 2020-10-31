import { useState } from "state";

export const Nav = () => {
  const {
    state: { signedIn, connected },
  } = useState();

  return (
    <nav className="flex block h-42-px items-center w-screen bordered">
      <div className="flex-grow p-2 centered text-xl items-center">
        HabitPulse
      </div>
      <div className="flex-shrink flex p-2">
        <div className="inline-block mr-4">signed in: {signedIn}</div>
        <div className="inline-block">connected: {connected}</div>
      </div>
    </nav>
  );
};
