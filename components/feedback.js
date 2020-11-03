import { Checkbox, Textarea, Range, classify } from "components";
import { useCallback } from "react";
import { useState } from "state";
import { map } from "ramda";

const buttonClass = `${classify("green")} w-full select-none mt-2`;
export const Feedback = () => {
  const {
    dispatch,
    state: { satisfied, score, feedback },
  } = useState();
  const handleSubmit = useCallback(() => {
    const formData = { satisfied, score, feedback };
    map(dispatch, [
      ["GIVE_FEEDBACK", formData],
      "CLOSE",
      "SHOW",
      "CLEAR_FEEDBACK",
    ]);
    setTimeout(() => dispatch("HIDE"), 1618);
  }, [dispatch, satisfied, score, feedback]);

  return (
    <form className="w-full min-w-md max-w-md rounded p-6">
      <Checkbox
        dispatch={dispatch}
        name="satisfied"
        value={satisfied}
        labelText="Are you satisfied?"
      />
      <Range
        dispatch={dispatch}
        name="score"
        value={score}
        labelText="How do you rate us?"
      />
      <Textarea
        dispatch={dispatch}
        name="feedback"
        value={feedback}
        labelText="How can we improve?"
      />
      <button className={buttonClass} onClick={handleSubmit} id="submit-button">
        Submit
      </button>
    </form>
  );
};
