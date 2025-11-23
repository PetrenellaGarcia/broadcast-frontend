import React from "react";

const TextField = ({ label, name, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
    </div>
  );
};

export default TextField;
