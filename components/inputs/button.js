import React, { useMemo } from "react";

export const classify = (color) => `
hover:bg-${color}-700 hover:border-${color}-900 bg-${color}-600 border-${color}-800 
text-white font-bold py-1 px-2 border-b-4 rounded`;

export const Button = ({ color, onClick, children, id }) => {
  const classString = useMemo(() => classify(color), [color]);
  return (
    <button type="button" className={classString} id={id} onClick={onClick}>
      {children}
    </button>
  );
};

export const redButton = classify("red");
export const greenButton = classify("green");
