import { useState } from "react";
import LoginModal from "./modal.js";

import userbase from "userbase-js";

export default function Nav({ user, setUser }) {
  const [open, setOpen] = useState();
  const [modalType, setModalType] = useState();

  function openModal(type) {
    setOpen(true);
    setModalType(type);
  }

  async function logOut() {
    try {
      await userbase.signOut();
      setUser(null);
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <nav className="flex block h-42-px items-center w-screen border-b-2 border-black">
      <div className="flex-grow p-4 centered text-xl items-center">
        HabitPulse
      </div>
      <ul className="flex-shrink flex justify-end items-center p-4">
        {!user ? (
          <>
            <li>
              <button
                className="font-bold mx-2"
                onClick={() => openModal("logIn")}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                className="btn-green mx-2"
                onClick={() => openModal("signUp")}
              >
                Save & Sync
              </button>
            </li>
          </>
        ) : (
          <li>
            <button className="font-bold" onClick={logOut}>
              Log Out
            </button>
          </li>
        )}
      </ul>
      {open && (
        <div className="w-4/5 md:w-1/2 mx-auto">
          <LoginModal
            toggle={setOpen}
            modalType={modalType}
            setUser={setUser}
          />
        </div>
      )}
    </nav>
  );
}
