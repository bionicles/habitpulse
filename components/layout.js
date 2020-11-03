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
        <div className="h-screen w-screen overflow-hidden max-w-full">
          <Nav />
          <Tape />
        </div>
      );
  }
};

export const Layout = () => {
  const {
    state: { layoutMode },
  } = useState();

  return <div className="flex flex-col">{ChosenForm({ layoutMode })}</div>;
};
