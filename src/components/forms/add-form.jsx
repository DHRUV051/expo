'use client'
import { useForm } from 'react-hook-form'
import TextInput from '../globals/text-input'
import Button from '../globals/button'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.data.statusCode === 201) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      toast.error('Error Creating User')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <TextInput
        label='Name'
        id='name'
        placeholder='Enter Name'
        register={register}
        required
        error={errors.name}
        errorMessage='Name is required'
      />

      <TextInput
        label='Email address'
        id='email'
        placeholder='Enter Email'
        register={register}
        required
        error={errors.email}
        errorMessage='Email is required'
      />

      <TextInput
        type='password'
        label='Password'
        id='password'
        placeholder='Enter Password'
        register={register}
        required
        error={errors.password}
        errorMessage='Password is required'
      />

      <div className='form-field'>
        <label htmlFor='role' className='form-label'>
          Role
        </label>
        <select
          id='role'
          {...register('role', { required: true })}
          className={`form-input ${errors.role ? 'input-error custom-select' : ''}`}
        >
          <option value='Admin'>Admin</option>
          <option value='Front Desk'>Front Desk</option>
          <option value='Representative'>Representative</option>
        </select>
      </div>

      <Button type={'submit'}>Add</Button>
      <ToastContainer />
    </form>
  )
}

export default AddForm
