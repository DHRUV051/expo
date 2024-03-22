import { useState } from 'react'
import Button from '../globals/Button'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import axios from 'axios'
import { MdError } from 'react-icons/md'

const UpdateForm = ({ rowData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [role, setRole] = useState(rowData.role)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async data => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${rowData.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log('response', response)
      if (response.data.statusCode === 201) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error updating user data:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <div className='form-field'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          type='text'
          id='name'
          defaultValue={rowData.name}
          {...register('name', { required: true })}
          className={`form-input ${errors.name ? 'input-error' : ''}`}
        />
        {errors.name && <span className='error-message'>Name is required</span>}
      </div>

      <div className='form-field'>
        <label htmlFor='email' className='form-label'>
          Email address
        </label>
        <input
          type='email'
          id='email'
          defaultValue={rowData.email}
          {...register('email', { required: true })}
          className={`form-input ${errors.email ? 'input-error' : ''}`}
        />
        {errors.email && <span className='error-message'>Email is required</span>}
      </div>

      <div className='form-field'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <div className='password-input-container'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            {...register('password', { required: true })}
            className={`form-input ${errors.password ? 'input-error' : ''}`}
          />
          <button type='button' onClick={() => setShowPassword(!showPassword)} className='password-toggle'>
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        {errors.password && (
          <span className='error-message'>
            <MdError className='error-icon' size={24} />
            <span>Password is Requires</span>
          </span>
        )}
      </div>

      <div className='form-field'>
        <label htmlFor='role' className='form-label'>
          Role
        </label>
        <select
          id='role'
          value={role}
          onChange={e => setRole(e.target.value)}
          {...register('role', { required: true })}
          className={`form-input ${errors.role ? 'input-error custom-select' : ''}`}
        >
          <option value='Admin'>Admin</option>
          <option value='Front Desk'>Front Desk</option>
          <option value='Representative'>Representative</option>
        </select>
        {errors.role && <span className='error-message'>Role is required</span>}
      </div>

      <Button type='submit'>Update</Button>
    </form>
  )
}

export default UpdateForm
