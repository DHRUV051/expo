'use client'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import './search.css'
import { FaSearch } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@components/globals/loading-page'

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [loadingSave, setLoadingSave] = useState(false)
  const [show, setShow] = useState(null)

  useEffect(() => {
    if (data && watch('visited_expo') !== data.visited_expo) {
      setValue('visited_expo', data.visited_expo)
    }
  }, [data, watch, setValue])

  const onSubmit = async data => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/${data.search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setData(response.data.data)
    } catch (error) {
      toast.error('Error fetching student data', error)
      console.log('Error fetching student data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleButtonShow = () => {
    if (data.visited_expo === true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

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
    <main className='main'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='Search'>
          <h1 className='text-3xl title'>Search Student</h1>
          <div className='flex relative'>
            <input
              label='Search Student'
              className='p-1 rounded-md outline outline-1'
              id='search'
              {...register('search', {
                required: 'Search is required'
              })}
            />

            <Button type='submit' className='Search-Button' variant='gradient' disabled={loading}>
              Search
            </Button>
            <Button type='submit' size='sm' className='Search-Button-small' variant='gradient' disabled={loading}>
              <FaSearch />
            </Button>
            {errors.search && <p className='absolute top-10 text-[12px] text-red-500'>{errors.search.message}</p>}
          </div>
        </div>
      </form>

      {loading ? (
        <Loading />
      ) : (
        data && (
          <div className='relative flex bg-white items-center justify-center flex-row mt-[50px] w-full'>
            <div className='info'>
              <div className=''>
                <fieldset className='border rounded-[5px] border-[rgb(20,23,24)] p-3'>
                  <legend className='font-bold'>Personal Information</legend>
                  <p className='info-item font-bold'>
                    Name: <span className='font-semibold'>{data.name}</span>
                  </p>

                  <p className='info-item font-bold'>
                    Email: <span className='font-semibold'>{data.email}</span>
                  </p>

                  <p className='info-item font-bold'>
                    Branch: <span className='font-semibold'>{data.branch}</span>
                  </p>

                  <p className='info-item font-bold'>
                    Qualification: <span className='font-semibold capitalize'>{data.qualification}</span>
                  </p>
                </fieldset>
              </div>

              <div className='exam'>
                <fieldset className='border rounded-[5px] border-[rgb(20,23,24)] p-3'>
                  <legend className='font-bold'>Exam Information</legend>
                  <p className='info-item font-bold'>
                    Is Exam Attended:
                    <span className='font-semibold'>{data.is_exam_attended ? 'Yes' : 'No'}</span>
                  </p>

                  {data.is_exam_attended && (
                    <div className='exam-info'>
                      <h3 className='font-bold'>Exams:</h3>
                      <ul className='sub-list'>
                        {data.student_exams.map((exam, index) => (
                          <li key={exam.u_id} className='font-bold list'>
                            {exam.exam.name}: {exam.result}
                            {index !== data.student_exams.length - 1 && ','}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className='countries-list'>
                    <h3 className='font-bold'>Countries:</h3>
                    <ul className='sub-list'>
                      {data.student_countries.map((country, index) => (
                        <li key={country.country.country_u_id} className='font-bold list'>
                          {country.country.name}
                          {index !== data.student_countries.length - 1 && ','}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='flex flex-row items-center space-x-4'>
                    <input
                      type='checkbox'
                      id='visited_expo'
                      defaultChecked={data.visited_expo}
                      {...register('visited_expo')}
                      checked={watch('visited_expo')}
                      className={`checkbox-icon ${data.visited_expo && 'disabled'}   `}
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
                {show && (
                  <Button
                    type='button'
                    size='lg'
                    onClick={onSave}
                    className=' text-white font-bold mt-2 py-2 w-full px-4 rounded'
                    disabled={data.visited_expo}
                  >
                    {loadingSave ? 'Saving...' : 'Save'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      )}

      <ToastContainer />
    </main>
  )
}

export default SearchForm
