import { useCallback, useMemo } from "react";
import { Label } from "components";

export const Text = ({ name, value, dispatch, labelText, password }) => {
  const handleChange = useCallback(
    (e) => dispatch(["SET", { [name]: e.target.value }]),
    [dispatch, name]
  );
  const id = useMemo(() => `${name}-input`, [name]);
  return (
    <div key={name} className="mb-2">
      <Label id={id} labelText={labelText} />
      <input
        className="rounded p-2 bordered"
        id={id}
        type={password ? "password" : "text"}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
