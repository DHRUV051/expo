'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@material-tailwind/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TextInput from '@components/globals/text-input'

const EditStudentCreateForm = ({ rowData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger
  } = useForm()

  const [isExamAttended, setIsExamAttended] = useState(false)
  const [selectedExams, setSelectedExams] = useState([])
  const [countries, setCountries] = useState([])
  const [exams, setExams] = useState([])
  const [selectedCountries, setSelectedCountries] = useState({})
  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [isOtherChecked, setIsOtherChecked] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [otherCountry, setOtherCountry] = useState('')

  useEffect(() => {
    if (rowData) {
      setValue('name', rowData.name || '')
      setValue('email', rowData.email || '')
      setValue('address', rowData.address || '')
      setValue('phone_number', rowData.phone_number || '')
      setValue('branch', rowData.branch || '')
      setValue('qualification', rowData.qualification || '')
      setValue('is_exam_attended', rowData.is_exam_attended || false)
      setValue('visited_expo', rowData.visited_expo || false)
      const selectedCountriesData = {}
      rowData.student_countries.forEach(country => {
        selectedCountriesData[country.country_u_id] = true
      })
      setSelectedCountries(selectedCountriesData)

      const selectedExamsData = rowData.student_exams.map(exam => exam.exam.name)
      setSelectedExams(selectedExamsData)

      const defaultSelectedServices = rowData.student_services.map(service => service.service.u_id)
      setSelectedServices(defaultSelectedServices || [])

      setIsExamAttended(rowData.is_exam_attended || false)
    }
  }, [rowData, setValue])

  const handleCheckboxChange = (countryId, isChecked) => {
    setSelectedCountries(prevSelectedCountries => ({
      ...prevSelectedCountries,
      [countryId]: isChecked
    }))
  }

  // Fetch countries and exams
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/country`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setCountries(countryResponse.data.data)

        const examResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exam`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setExams(examResponse.data.data)

        const serviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setServices(serviceResponse.data.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleOtherCheckboxChange = () => {
    setIsOtherChecked(prev => !prev)
    if (!isOtherChecked) {
      setOtherCountry('')
    }
  }

  const handleExamAttendanceChange = e => {
    setIsExamAttended(e.target.checked)
  }

  const handleExamCheckboxChange = (examName, isChecked) => {
    setSelectedExams(prevSelectedExams =>
      isChecked ? [...prevSelectedExams, examName] : prevSelectedExams.filter(name => name !== examName)
    )
  }

  const onSubmit = async data => {
    try {
      data.country = Object.keys(selectedCountries).filter(countryId => selectedCountries[countryId])

      if (isOtherChecked) {
        data.country.push(data?.other_country)
      }

      data.exam = selectedExams.map(examName => {
        const foundExam = exams.find(exam => exam.name === examName)
        const scoreFieldName = `${examName}Score`
        const result = data[scoreFieldName]

        return {
          u_id: foundExam ? foundExam.u_id : null,
          result: result || null
        }
      })

      selectedExams.forEach(examName => {
        const scoreFieldName = `${examName}Score`
        delete data[scoreFieldName]
      })
      delete data.undefinedScore
      delete data.other_country

      data.service = selectedServices.map(serviceId => serviceId)
      console.log('data', data)

      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/student/${rowData.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log('response', response)
      window.location.reload()
      toast.success('Data saved successfully!')
    } catch (error) {
      toast.error('Error updating student data')
      console.log('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
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
          placeholder='Enter Name'
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
          placeholder='Enter Email'
        />
        {errors.email && <span className='error-message'>Email is required</span>}
      </div>
      {/* Address Field */}
      <div className='form-field'>
        <label htmlFor='address' className='form-label'>
          Address
        </label>
        <input
          type='text'
          id='address'
          defaultValue={rowData.address}
          {...register('address', { required: true })}
          className={`form-input ${errors.address ? 'input-error' : ''}`}
          placeholder='Enter Address'
        />
        {errors.address && <span className='error-message'>Address is required</span>}
      </div>
      {/* Phone Number Field */}
      <div className='form-field'>
        <label htmlFor='phone_number' className='form-label'>
          Phone Number
        </label>
        <input
          type='tel'
          id='phone_number'
          defaultValue={rowData.phone_number}
          {...register('phone_number', {
            required: 'Phone Number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Phone Number must be 10 digits long and contain only numbers'
            },
            validate: value => {
              return !isNaN(value) && value.length === 10
            }
          })}
          onChange={() => trigger('phone_number')}
          className={`form-input ${errors.phone_number ? 'input-error' : ''}`}
          placeholder='Enter Phone Number'
        />
        {errors.phone_number && <span className='error-message'>{errors.phone_number.message}</span>}
      </div>
      {/* Branch Field */}
      <div className='form-field'>
        <label htmlFor='branch' className='form-label'>
          Branch
        </label>
        <select
          id='branch'
          selected={rowData.branch}
          {...register('branch')}
          className={`form-input ${errors.branch ? 'input-error' : ''}`}
        >
          <option value='Anand'>Anand</option>
          <option value='Baroda'>Baroda</option>
          <option value='Nadiad'>Nadiad</option>
          <option value='Surat'>Surat</option>
        </select>
        {errors.branch && <span className='error-message'>Branch is required</span>}
      </div>

      <div className='form-field'>
        <label htmlFor='branch' className='form-label'>
          Qualification
        </label>
        <select
          id='qualification'
          selected={rowData.qualification}
          {...register('qualification')}
          className={`form-input ${errors.branch ? 'input-error' : ''}`}
        >
          <option value='10th'>10th</option>
          <option value='12th'>12th</option>
          <option value='bachelor'>Bachelor</option>
          <option value='master'>Master</option>
        </select>
        {errors.branch && <span className='error-message'>Branch is required</span>}
      </div>

      <div className='form-field'>
        <label className='form-label'>Countries are you interested in?</label>
        <div className='form-sub-field-select'>
          {countries.map(country => {
            if (country.u_id === 'COU1000007') {
              return
            }

            return (
              <div key={country.u_id} className='flex items-center'>
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
        <label className='form-label checkbox-label-student mt-4'>Is Exam Given?</label>
        <input
          type='checkbox'
          id='examAttended'
          defaultChecked={rowData.is_exam_attended}
          {...register('is_exam_attended')}
          className='checkbox-icon extra'
          onChange={handleExamAttendanceChange}
        />
      </div>

      {isExamAttended && (
        <div className='form-field'>
          <label className='form-label'>Given Exams</label>
          <div className='form-sub-field-select'>
            {exams.map(exam => (
              <div key={exam.u_id} className='flex'>
                <input
                  type='checkbox'
                  id={exam.name}
                  checked={selectedExams.includes(exam.name)}
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
            <div key={exam.u_id} className='form-field mt-4'>
              {selectedExams.includes(exam.name) && (
                <div className='flex flex-col mt-[10px]'>
                  <label htmlFor={`${exam.name}Score`} className='mr-2'>{`Overall Score for ${exam.name}`}</label>
                  <input
                    type='text'
                    id={`${exam.name}Score`}
                    {...register(`${exam.name}Score`, {
                      required: `Overall Score for ${exam.name} is required`,
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: `Please enter a valid score for ${exam.name}`
                      }
                    })}
                    defaultValue={rowData.student_exams.find(e => e.exam.name === exam.name)?.result || ''}
                    className={`w-full form-input ${errors[`${exam.name}Score`] ? 'input-error' : ''}`}
                  />
                  {errors[`${exam.name}Score`] && (
                    <span className='error-message'>{errors[`${exam.name}Score`].message}</span>
                  )}
                </div>
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
          id='student_services'
          value={selectedServices}
          {...register('service')}
          onChange={e => setSelectedServices(Array.from(e.target.selectedOptions, option => option.value))}
          className={`form-input ${errors.services ? 'input-error' : ''}`}
        >
          <option value='' disabled>
            Select Services
          </option>
          {services.map(service => (
            <option key={service.u_id} value={service.u_id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div className='form-field flex'>
        <input
          type='checkbox'
          id='attendedExpo'
          defaultChecked={rowData.visited_expo}
          {...register('visited_expo')}
          className='checkbox-icon extra'
        />
        <label className='form-label checkbox-label-student mt-4 ml-2'>Is Student Visited Expo ?</label>
      </div>

      <Button className='w-full' type='submit'>
        Edit Student
      </Button>
      <ToastContainer />
    </form>
  )
}

export default EditStudentCreateForm
