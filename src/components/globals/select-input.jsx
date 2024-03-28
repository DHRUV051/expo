import React, { useState } from 'react'
import { MdError } from 'react-icons/md'

const SelectInput = ({ label, id, options, register, required, error, errorMessage }) => {
  const [selected, setSelected] = useState(false)
  selected && console.log(selected)

  const handleSelectChange = event => {
    setSelected(event.target.value === '')
  }

  return (
    <div className='form-field'>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <select
        id={id}
        className={`form-input  ${error ? 'input-error custom-select' : ''}`}
        {...register(id, { required: required && errorMessage })}
        onChange={handleSelectChange}
      >
        {!options.some(option => option.value === '') && (
          <option value='' disabled selected>
            Select {label}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className='error-message'>
          <MdError className='error-icon-select' size={24} />
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default SelectInput
