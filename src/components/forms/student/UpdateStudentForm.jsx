import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@material-tailwind/react'
import axios from 'axios'

const EditStudentCreateForm = ({ rowData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const [isExamAttended, setIsExamAttended] = useState(false)
  const [selectedExams, setSelectedExams] = useState([])
  const [countries, setCountries] = useState([])
  const [exams, setExams] = useState([])
  const [selectedCountries, setSelectedCountries] = useState({})

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/${rowData.u_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const studentData = response.data.data

        // Populate form fields with student data
        setValue('name', studentData.name)
        setValue('email', studentData.email)
        setValue('address', studentData.address)
        setValue('phone_number', studentData.phone_number)
        setValue('branch', studentData.branch)
        setValue('is_exam_attended', studentData.is_exam_attended)
        setValue(
          'exam',
          studentData.student_exams.map(exam => exam.exam.name)
        )

        studentData.student_exams.forEach(exam => {
          const scoreFieldName = `${exam.name}Score`
          setValue(scoreFieldName, exam.result)
        })

        // Set selected countries
        const selectedCountriesData = {}
        studentData.student_countries.forEach(country => {
          selectedCountriesData[country.country_u_id] = true
        })

        setSelectedCountries(selectedCountriesData)

        const selectedExamsData = studentData.student_exams.map(exam => exam.exam.name)
        setSelectedExams(selectedExamsData)

        // Set exam attended state
        setIsExamAttended(studentData.is_exam_attended)
      } catch (error) {
        console.error('Error fetching student data:', error)
      }
    }

    fetchStudentData()
  }, [rowData.u_id, setValue])

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
        const countryResponse = await axios.get(
          'https://9acb-2405-201-2006-7d89-c5b8-f9d2-266c-56b9.ngrok-free.app/country',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        setCountries(countryResponse.data.data)

        const examResponse = await axios.get(
          'https://9acb-2405-201-2006-7d89-c5b8-f9d2-266c-56b9.ngrok-free.app/exam',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        setExams(examResponse.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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

      data.exam = selectedExams.map(examName => {
        const foundExam = exams.find(exam => exam.name === examName)
        const scoreFieldName = `${examName}Score`

        return {
          u_id: foundExam ? foundExam.u_id : null,
          result: data[scoreFieldName]
        }
      })

      selectedExams.forEach(examName => {
        const scoreFieldName = `${examName}Score`
        delete data[scoreFieldName]
      })

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
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
          {...register('phone_number', { required: true })}
          className={`form-input ${errors.phone_number ? 'input-error' : ''}`}
          placeholder='Enter Phone Number'
        />
        {errors.phone_number && <span className='error-message'>Phone Number is required</span>}
      </div>
      {/* Branch Field */}
      <div className='form-field'>
        <label htmlFor='branch' className='form-label'>
          Branch
        </label>
        <select
          id='branch'
          defaultValue={rowData.branch}
          {...register('branch', { required: true })}
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
        <label className='form-label'>Country Selection</label>
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
        <label className='form-label checkbox-label-student mt-4'>Is Exam Attended?</label>
        <input
          type='checkbox'
          id='examAttended'
          checked={isExamAttended}
          className='checkbox-icon extra'
          onChange={handleExamAttendanceChange}
        />
      </div>

      {isExamAttended && (
        <div className='form-field'>
          <label className='form-label'>Select Exams</label>
          <div className='form-sub-field'>
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
                <>
                  <input
                    type='text'
                    id={`${exam.name}Score`}
                    {...register(`${exam.name}Score`, { required: true })}
                    defaultValue={rowData.student_exams.find(e => e.exam.name === exam.name)?.result || ''}
                    className={`form-input ${errors[`${exam.name}Score`] ? 'input-error' : ''}`}
                    placeholder={`Enter Overall Score for ${exam.name}`}
                  />
                  {errors[`${exam.name}Score`] && <span className='error-message'>Score is required</span>}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <Button className='w-full' type='submit'>
        Add User
      </Button>
    </form>
  )
}

export default EditStudentCreateForm
