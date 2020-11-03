import React, { useCallback, useMemo } from "react";
import { Label } from "components";

export const Range = ({ name, value, dispatch, labelText }) => {
  const handleChange = useCallback(
    e => dispatch(["SET", { [name]: e.target.value }]),
    [dispatch, name]
  );
  const id = useMemo(() => `${name}-range`, [name]);
  return (
    <div key={name} className="mb-1">
      <Label id={id} labelText={labelText} valueLabel={value} />
      <input
        type="range"
        className="w-full slider"
        id={id}
        onChange={handleChange}
      />
    </div>
  );
};
