import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '@components/globals/TextInput'

import SelectInput from '@components/globals/SelectInput'
import axios from 'axios'
import { Button } from '@material-tailwind/react'

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

  const [selectedCountries, setSelectedCountries] = useState({})

  const handleCheckboxChange = (countryId, isChecked) => {
    setSelectedCountries(prevSelectedCountries => ({
      ...prevSelectedCountries,
      [countryId]: isChecked
    }))
  }

  const fetchData = async () => {
    try {
      const countryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/country`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log('countryResponse', countryResponse)
      setCountries(countryResponse.data.data)

      const examResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exam`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setExams(examResponse.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
      formData.country = Object.keys(selectedCountries).filter(countryId => selectedCountries[countryId])

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

      console.log(formData)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.data.statusCode === 201) {
        window.location.reload()
      }
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
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
        error={errors.phonenumber}
        errorMessage='Phone is required'
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

      <div className='form-field'>
        <label className='form-label'>Countries are you interested in?</label>
        <div className='form-sub-field'>
          {countries.map(country => (
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
          ))}
        </div>
      </div>

      <div className='form-field flex'>
        <label className='form-label checkbox-label-student mt-4'>Is Exam Any Given?</label>
        <input
          type='checkbox'
          id='examAttended'
          className='checkbox-icon extra'
          onChange={handleExamAttendanceChange}
        />
      </div>

      {isExamAttended && (
        <div className='form-field'>
          <label className='form-label'>Given Exam</label>
          <div className='form-sub-field'>
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
            <div key={exam.u_id} className='form-field mt-4'>
              {selectedExams.includes(exam.name) && (
                <TextInput
                  id={`${exam.name}Score`}
                  label={`Overall Score for ${exam.name}`}
                  placeholder='Enter Overall Score'
                  register={register}
                  required
                  error={errors[`${exam.name}Score`]}
                  errorMessage={`Overall Score for ${exam.label} is required`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <SelectInput
        label='Other Services'
        id='otherservices'
        options={[
          { value: 'CANADA - PR', label: 'CANADA - PR' },
          { value: 'USA H1 -B', label: 'USA H1 -B' },
          { value: 'FREE GERMAN EDUCATION', label: 'FREE GERMAN EDUCATION' },
          { value: 'OTHER', label: 'OTHER' }
        ]}
        register={register}
        error={errors.role}
        errorMessage='Role is required'
      />

      <Button className='w-full' type='submit'>
        Add User
      </Button>
    </form>
  )
}

export default StudentCreateform
