export const Label = ({ id, labelText, valueLabel }) => (
  <div className="flex flex-row items-center select-none">
    <label htmlFor={id} className="block text-gray-700 text-md font-bold">
      {labelText}
    </label>
    {valueLabel ? (
      <span className="flex-shrink font-black text-lg ml-2">{valueLabel}</span>
    ) : null}
  </div>
);
