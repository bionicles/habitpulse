import { Modal, Alert, Nav, Tape } from "components";
import { useState } from "state";

const ChosenForm = ({ layoutMode }) => {
  switch (layoutMode) {
    case "ALERT":
      return <Alert />;
    case "MODAL":
      return <Modal />;
    default:
      return (
        <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll max-w-full">
          <Tape />
        </div>
      );
  }
};

export const Layout = () => {
  const {
    state: { layoutMode },
  } = useState();

  return (
    <div className="flex flex-col place-content-center h-screen">
      {ChosenForm({ layoutMode })}
    </div>
  );
};
