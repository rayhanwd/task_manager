import React from "react";

const InputField = ({ name, type, placeholder, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {placeholder}
      </label>
      <input
        name={name}
        type={type}
        autoComplete="off"
        className={`block w-full rounded-md border-2 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
          error ? "border-red-500" : ""
        }`}
        value={value}
        onChange={onChange}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
