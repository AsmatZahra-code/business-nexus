import React from "react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
      />
    </div>
  );
};

export default InputField;
