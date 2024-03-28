'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '@components/globals/text-input'

import SelectInput from '@components/globals/select-input'
import axios from 'axios'
import { Button } from '@material-tailwind/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const StudentCreateform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [isExamAttended, setIsExamAttended] = useState(false)
  const [selectedExams, setSelectedExams] = useState([])
  const [countries, setCountries] = useState([])
  const [exams, setExams] = useState([])
  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [isOtherChecked, setIsOtherChecked] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [otherCountry, setOtherCountry] = useState('')

  const fetchData = async () => {
    try {
      const countryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/country`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setCountries(countryResponse.data.data)
      console.log('countries', countryResponse.data.data)

      const examResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exam`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setExams(examResponse.data.data)

      const serviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setServices(serviceResponse.data.data)
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOtherCheckboxChange = () => {
    setIsOtherChecked(prev => !prev)
    if (!isOtherChecked) {
      setOtherCountry('')
    }
  }

  const handleCheckboxChange = (countryId, isChecked) => {
    setSelectedCountries(prevSelectedCountries => ({
      ...prevSelectedCountries,
      [countryId]: isChecked
    }))
    console.log('selectedCountries', selectedCountries)
  }

  const handleExamCheckboxChange = (examName, isChecked) => {
    setSelectedExams(prevSelectedExams =>
      isChecked ? [...prevSelectedExams, examName] : prevSelectedExams.filter(name => name !== examName)
    )
  }

  const handleExamAttendanceChange = e => {
    setIsExamAttended(e.target.checked)
  }

  const onSubmit = async data => {
    try {
      let formData = { ...data }

      formData.country = Object.keys(selectedCountries).filter(
        countryId => selectedCountries[countryId] && countryId !== '0'
      )
      if (isOtherChecked) {
        formData.country.push(data?.other_country)
      }

      formData.exam = selectedExams.map(examName => {
        const foundExam = exams.find(exam => exam.name === examName)
        const scoreFieldName = `${examName}Score`

        return {
          u_id: foundExam ? foundExam.u_id : null,
          result: formData[scoreFieldName]
        }
      })

      selectedExams.forEach(examName => {
        const scoreFieldName = `${examName}Score`
        delete formData[scoreFieldName]
      })
      delete formData.other_country
      formData.service = selectedServices.map(serviceId => serviceId)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 201) {
        window.location.reload()
      }
    } catch (error) {
      toast('Error Creating Student')
      console.log('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
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
        id='email'
        label='Email Address'
        placeholder='Enter Email'
        register={register}
        required
        error={errors.email}
        errorMessage='Email is required'
      />

      <TextInput
        id='address'
        label='Address'
        placeholder='Enter Address'
        register={register}
        required
        error={errors.address}
        errorMessage='Address is required'
      />

      <TextInput
        id='phone_number'
        label='Phone Number'
        placeholder='Enter Phone Number'
        register={register}
        required
        error={errors.phone_number} // Pass error object from React Hook Form
        errorMessage='Phone is required'
        pattern={{ value: /^[0-9]{10}$/, message: 'Phone Number must be 10 digits long and contain only numbers' }}
      />

      <SelectInput
        label='Branch'
        id='branch'
        options={[
          { value: 'Anand', label: 'Anand' },
          { value: 'Baroda', label: 'Baroda' },
          { value: 'Nadiad', label: 'Nadiad' },
          { value: 'Surat', label: 'Surat' }
        ]}
        register={register}
        error={errors.role}
        errorMessage='Role is required'
      />

      <SelectInput
        label='Qualification'
        id='qualification'
        options={[
          { value: '10th', label: '10th' },
          { value: '12th', label: '12th' },
          { value: 'bachelor', label: 'Bachelor' },
          { value: 'master', label: 'Master' }
        ]}
        register={register}
        error={errors.qualification}
        errorMessage='Qualification is required'
      />

      <div className='form-field'>
        <label className='form-label'>Countries are you interested in?</label>
        <div className='form-sub-field-select'>
          {countries.map(country => {
            if (country.u_id === 'COU1000007') {
              return
            }

            return (
              <div key={country.u_id} className='flex items-center mt-2'>
                <input
                  type='checkbox'
                  id={country.name}
                  checked={selectedCountries[country.u_id]}
                  onChange={e => handleCheckboxChange(country.u_id, e.target.checked)}
                  className='checkbox-icon'
                />
                <label htmlFor={country.name} className='checkbox-label'>
                  {country.name}
                </label>
              </div>
            )
          })}
          <div className='flex items-center mt-2'>
            <input
              type='checkbox'
              id='OTHER'
              checked={isOtherChecked}
              onChange={handleOtherCheckboxChange}
              className='checkbox-icon'
            />
            <label htmlFor='OTHER' className='checkbox-label'>
              OTHER
            </label>
          </div>
        </div>
      </div>
      {isOtherChecked && (
        <TextInput
          id='other_country'
          type='text'
          register={register}
          onChange={e => setOtherCountry(e.target.value)}
          placeholder='Enter other country'
        />
      )}

      <div className='form-field flex'>
        <label className='form-label checkbox-label-student mt-4'>Is Exam Any Given?</label>
        <input
          type='checkbox'
          id='examAttended'
          className='checkbox-icon extra'
          {...register('is_exam_attended')}
          onChange={handleExamAttendanceChange}
        />
      </div>

      {isExamAttended && (
        <div className='form-field'>
          <label className='form-label'>Given Exam</label>
          <div className='form-sub-field-select'>
            {exams.map(exam => (
              <div key={exam.u_id} className='flex'>
                <input
                  type='checkbox'
                  id={exam.name}
                  className='checkbox-icon'
                  onChange={e => handleExamCheckboxChange(exam.name, e.target.checked)}
                />
                <label htmlFor={exam.name} className='checkbox-label'>
                  {exam.name}
                </label>
              </div>
            ))}
          </div>

          {exams.map(exam => (
            <div key={exam.u_id} className='form-sub-field'>
              {selectedExams.includes(exam.name) && (
                <TextInput
                  id={`${exam.name}Score`}
                  label={`Overall Score for ${exam.name}`}
                  placeholder='Enter Overall Score'
                  register={register}
                  required
                  error={errors[`${exam.name}Score`]}
                  pattern={{
                    value: /^-?\d*\.?\d*$/,
                    message: 'Please enter a valid number'
                  }}
                  errorMessage={`Overall Score for ${exam.label} is required`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className='form-field'>
        <label htmlFor='services' className='form-label'>
          Services
        </label>
        <select
          id='service'
          {...register('service')}
          onChange={e => setSelectedServices(Array.from(e.target.selectedOptions, option => option.value))}
          className={`form-input ${errors.services ? 'input-error' : ''}`}
        >
          <option value='' disabled selected>
            Select Services
          </option>
          {services.map(service => (
            <option key={service.u_id} value={service.u_id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <Button className='w-full' type='submit'>
        Add Student
      </Button>
      <ToastContainer />
    </form>
  )
}

export default StudentCreateform
