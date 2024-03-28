import { Button } from '@material-tailwind/react'
import './student-view.css'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const StudentView = ({ studentData }) => {
  const { register, setValue, watch } = useForm()
  const [loadingSave, setLoadingSave] = useState(false)
  const [show, setShow] = useState(null)

  const handleButtonShow = () => {
    if (studentData.visited_expo === true) {
      setShow(false)
    } else if (watch('visited_expo') === true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  useEffect(() => {
    if (studentData && watch('visited_expo') !== studentData.visited_expo) {
      setValue('visited_expo', studentData.visited_expo)
    }
  }, [studentData, watch, setValue])

  const handleCheckboxChange = () => {
    const isVisited = !watch('visited_expo')
    setValue('visited_expo', isVisited)
  }

  const onSave = async () => {
    setLoadingSave(true)
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/student/${data.u_id}`,
        {
          visited_expo: watch('visited_expo')
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      toast.success('Data saved successfully!')
    } catch (error) {
      console.log('Error updating student data:', error)
      toast.error('Error updating student data:', error)
    } finally {
      setLoadingSave(false)
    }
  }

  return (
    <div className='student-info'>
      <div className=''>
        <fieldset className='border rounded-[5px] border-[rgb(20,23,24)] p-3'>
          <legend className='font-bold'>Personal Information</legend>
          <p className='info-item font-bold'>
            Name: <span className='font-semibold'>{studentData.name}</span>
          </p>

          <p className='info-item font-bold'>
            Email: <span className='font-semibold'>{studentData.email}</span>
          </p>

          <p className='info-item font-bold'>
            Branch: <span className='font-semibold'>{studentData.branch}</span>
          </p>

          <p className='info-item font-bold'>
            Qualification: <span className='font-semibold capitalize'>{studentData.qualification}</span>
          </p>
        </fieldset>
      </div>

      <div className='exam'>
        <fieldset className='border rounded-[5px] border-[rgb(20,23,24)] p-3'>
          <legend className='font-bold'>Exam Information</legend>
          <p className='info-item font-bold'>
            Is Exam Attended:
            <span className='font-semibold'>{studentData.is_exam_attended ? 'Yes' : 'No'}</span>
          </p>

          {studentData.is_exam_attended && (
            <div className='exam-info'>
              <h3 className='font-bold'>Exams:</h3>
              <ul className='sub-list'>
                {studentData.student_exams.map((exam, index) => (
                  <li key={exam.u_id} className='font-bold list'>
                    {exam.exam.name}: {exam.result}
                    {index !== studentData.student_exams.length - 1 && ','}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='countries-list'>
            <h3 className='font-bold'>Countries:</h3>
            <ul className='sub-list'>
              {studentData.student_countries.map((country, index) => (
                <li key={country.country.country_u_id} className='font-bold list'>
                  {country.country.name}
                  {index !== studentData.student_countries.length - 1 && ','}
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-row items-center space-x-4'>
            <input
              type='checkbox'
              id='visited_expo'
              defaultChecked={studentData.visited_expo}
              {...register('visited_expo')}
              checked={watch('visited_expo')}
              className={`checkbox-icon ${studentData.visited_expo && 'disabled'}   `}
              onChange={() => {
                handleButtonShow()
                handleCheckboxChange()
              }}
            />
            <label htmlFor='visited_expo' className='ml-2 font-bold'>
              Is Student Visited Expo ?
            </label>
          </div>
        </fieldset>
      </div>

      {show && (
        <Button
          size='lg'
          type='button'
          onClick={onSave}
          className=' text-white font-bold py-2 mt-2 w-full px-4 rounded'
          disabled={loadingSave}
        >
          {loadingSave ? 'Saving...' : 'Save'}
        </Button>
      )}

      <ToastContainer />
    </div>
  )
}

export default StudentView
