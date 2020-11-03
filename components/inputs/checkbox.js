import { useMemo, useCallback } from "react";

export const Checkbox = ({ name, value, dispatch, labelText }) => {
  const handleChange = useCallback(
    (e) => dispatch(["SET", { [name]: e.target.checked }]),
    [dispatch, name]
  );
  const valueLabel = useMemo(() => (value ? " Yes" : " No"), [value]);
  return (
    <label className="custom-label flex items-center mb-2">
      <div className="cursor-pointer bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
        <input
          name={name}
          type="checkbox"
          className="hidden"
          checked={value}
          onChange={handleChange}
        />
        <svg
          className="hidden w-4 h-4 text-green-600 pointer-events-none"
          viewBox="0 0 172 172"
        >
          <g
            fill="none"
            strokeWidth="none"
            strokeMiterlimit="10"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: "normal" }}
          >
            <path d="M0 172V0h172v172z" />
            <path
              d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
              fill="currentColor"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
      <span className="cursor-pointer select-none ml-2 text-gray-700 font-bold text-md">
        {labelText}
      </span>
      <span className="cursor-pointer flex-shrink font-black text-lg ml-2 select-none">
        {valueLabel}
      </span>
    </label>
  );
};
