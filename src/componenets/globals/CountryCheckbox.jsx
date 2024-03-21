import React from "react";

const CountryCheckbox = ({ id, name, checked, onChange, label }) => {
  return (
    <div className="country-checkbox flex space-x-3">
      <input
        type="checkbox"
        id={id}
        value={name}
        checked={checked}
        className="checkbox-input checkbox-icon "
        onChange={() => onChange(name)}
      />
      <label className="checkbox-label" htmlFor={id}>{label}</label>
    </div>
  );
};

export default CountryCheckbox;
