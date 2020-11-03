import React, { useCallback, useMemo } from "react";
import { Label } from "components";

export const Textarea = ({ name, value, dispatch, labelText }) => {
  const handleChange = useCallback(
    e => dispatch(["SET", { [name]: e.target.value }]),
    [dispatch, name]
  );
  const id = useMemo(() => `${name}-textarea`, [name]);
  return (
    <div key={name} className="mb-2">
      <Label id={id} labelText={labelText} />
      <textarea
        className="resize-none border rounded focus:outline-none focus:shadow-outline h-48 w-full p-2"
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
