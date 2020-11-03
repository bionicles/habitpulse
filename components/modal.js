import { Feedback, Account, Share, classify } from "components";
import { useCallback } from "react";
import { useState } from "state";
import { map } from "ramda";

const selectClass = classify("blue");
const buttonClass = classify("red");

export const Modal = () => {
  const {
    state: { formState, formOptions, message },
    dispatch,
  } = useState();
  console.log("formOptions:", formOptions);
  const closeModal = useCallback(() => dispatch("CLOSE"), [dispatch]);
  const Body = useCallback(() => {
    switch (formState) {
      case "Share":
        return <Share />;
      case "Account":
        return <Account />;
      default:
        return <Feedback />;
    }
  }, [formState]);
  // const Body = () => <div>Form</div>;
  const handleSelect = useCallback(
    (e) => dispatch(["SET", { formState: e.target.value }]),
    [dispatch]
  );
  return (
    <div className="self-center m-auto shadow-2xl bg-gray-300 rounded">
      <header className="flex">
        <select
          className={selectClass}
          value={formState}
          onChange={handleSelect}
        >
          {map(
            (formOption) => (
              <option
                key={formOption}
                className={formOption === formState ? "hidden" : ""}
                value={formOption}
              >
                {formOption}
              </option>
            ),
            formOptions
          )}
        </select>
        <button onClick={closeModal} className={buttonClass + " w-full"}>
          Close
        </button>
      </header>
      <Body />
      <p className="text-red-500 font-bold">{message}</p>
    </div>
  );
};
