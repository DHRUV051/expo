import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdError } from 'react-icons/md'

const TextInput = ({ label, type, id, placeholder, value, register, required, error, errorMessage, pattern }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='form-field'>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <input
        type={showPassword ? 'text' : type}
        id={id}
        value={value}
        placeholder={placeholder}
        {...register(id, {
          required: required && errorMessage,
          pattern: pattern && {
            value: pattern.value,
            message: pattern.message
          }
        })}
        className={`form-input ${error ? 'input-error' : ''}`}
      />
      {type === 'password' && (
        <button type='button' onClick={togglePasswordVisibility} className='password-toggle'>
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      )}
      {error && (
        <span className='error-message'>
          <MdError className='error-icon' size={24} />
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default TextInput
