import { Nav, Modal } from "components";
import { useState } from "state";

export const Layout = ({ children }) => {
  const {
    state: { layoutMode },
  } = useState();
  return (
    <div className="h-screen w-screen">
      <Nav />
      {layoutMode === "MODAL" ? (
        <div className="w-4/5 md:w-1/2 mx-auto">
          <Modal />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
