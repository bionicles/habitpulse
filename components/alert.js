import { useState } from "state";

export const Alert = () => {
  const {
    state: { alertHead, alertMessage, alertColor },
  } = useState();
  return (
    <div role="alert" className="m-auto text-4xl">
      <div
        className={`bg-${alertColor}-500 text-white font-bold rounded-t px-4 py-2`}
      >
        {alertHead}
      </div>
      <div
        className={`border border-t-0 border-${alertColor}-400 rounded-b bg-${alertColor}-100 px-4 py-2 text-${alertColor}-700`}
      >
        <p>{alertMessage}</p>
      </div>
    </div>
  );
};
