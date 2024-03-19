import React from "react";
import { MdError } from "react-icons/md";

const TextInput = ({ label, id, placeholder, register, required, error ,errorMessage, pattern }) => {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        {...register(id, {
          required: required && errorMessage,
          pattern: pattern && {
            value: pattern.value,
            message: pattern.message,
          },
        })}
        className={` form-input ${error ? "input-error" : ""}`}
      />
        { error && (
        <span className="error-message">
          <MdError className="error-icon" size={24}/>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextInput;
