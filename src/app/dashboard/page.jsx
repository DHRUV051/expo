'use client'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import Loading from '@components/globals/loading-page'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Button,
  DialogFooter,
  Typography
} from '@material-tailwind/react'
import UpdateForm from '@components/forms/update-form'
import AddForm from '@components/forms/add-form'
import ViewForm from '@components/view-form'
import { useForm } from 'react-hook-form'

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpload, setOpenUpload] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const { handleSubmit, register } = useForm()
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageRole = localStorage.getItem('role')
      const localStorageToken = localStorage.getItem('token')
      if (!localStorageToken === null || !localStorageRole) {
        router.push('/login')
      }else if(localStorageRole !== 'Admin'){
        router.push('/dashboard/student')
      }
    }
  }, [])


  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      grow: 1
    },
    {
      name: 'Email',
      selector: row => row.email,
      grow: 1
    },
    {
      name: 'Role',
      selector: row => row.role,
      grow: 2
    },
    {
      name: 'Action',
      cell: row => {
        return (
          <>
            <div className='flex space-x-4'>
              <button onClick={() => handleOpenView(row)}>
                <FaEye size={20} className='text-[rgb(102,102,102)]' />
              </button>
              <button onClick={() => handleOpenEdit(row)}>
                <MdEdit size={20} />
              </button>

              <button onClick={() => handleOpenDelete(row)}>
                <MdDelete size={20} className='text-red-500' />
              </button>
            </div>
          </>
        )
      },
      grow: 1
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        setData(response.data.data.adminData)
        setFilteredData(response.data.adminData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const result = data.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredData(result)
  }, [search, data])

  const handleOpenEdit = row => {
    setSelectedRow(row)
    setOpenEdit(!openEdit)
  }

  const handleOpenDelete = row => {
    setSelectedRow(row)
    setOpenDelete(!openDelete)
  }

  const handleOpenView = row => {
    setSelectedRow(row)
    setOpenView(!openView)
  }

  const handleOpenAdd = () => {
    setOpenAdd(!openAdd)
  }

  const handleOpenUpload = () => {
    setOpenUpload(!openUpload)
  }

  const handleDelete = async rowData => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/${rowData.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error deleting user data:', error)
    }
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const onSubmit = async () => {
    try {
      const fileData = new FormData()
      fileData.set('files', selectedFile)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student-excel-upload`, fileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log('response', response)
      if (response.status === 201) {
        setOpenUpload(false)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px'
      }
    },
    cells: {
      style: {
        paddingLeft: '0 8px',
        justifyContent: 'start',
        fontSize: '16px',
        fontWeight: '400'
      }
    },
    header: {
      style: {
        fontSize: '30px',
        fontWeight: 'bold',
        paddingLeft: '0px 8px'
      }
    }
  }

  return (
    <>
      { loading ? (
        <Loading suppressHydrationWarning></Loading>
      ) : (
        <>
          <div className='lg:my-[50px] my-[20px] px-[20px] lg:px-[100px] z-10'>
            <DataTable
              title='Employee'
              columns={columns}
              progressPending={loading}
              data={filteredData}
              fixedHeader
              fixedHeaderScrollHeight='500px'
              selectableRows
              selectableRowsHighlight
              pagination
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type='text'
                  placeholder='Search'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className='lg:w-[250px] sm:w-full md:w-[250px] form-input'
                />
              }
              actions={
                <>
                  <Button onClick={() => handleOpenUpload()}>Upload</Button>
                  <Button onClick={() => setOpenAdd(!openAdd)}>Add</Button>
                </>
              }
              customStyles={tableCustomStyles}
            />
          </div>
        </>
      )}
      <Dialog open={openEdit} handler={handleOpenEdit} suppressHydrationWarning>
        <DialogHeader className='justify-between'>
          <Typography variant='h5' color='blue-gray'>
            Edit Employee
          </Typography>
          <IconButton variant='text' color='blue-gray' onClick={handleOpenEdit}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <UpdateForm rowData={selectedRow} suppressHydrationWarning />
        </DialogBody>
      </Dialog>
      <Dialog open={openDelete} handler={handleOpenDelete} suppressHydrationWarning>
        <DialogHeader className='justify-between'>
          <Typography variant='h5' color='blue-gray'>
            Delete Confirmation
          </Typography>
          <IconButton variant='text' color='blue-gray' onClick={handleOpenDelete}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <p>Are you sure you want to delete this user?</p>
        </DialogBody>
        <DialogFooter>
          <Button variant='text' color='green' onClick={handleOpenDelete} className='mr-1'>
            <span>Cancel</span>
          </Button>
          <Button
            variant='gradient'
            color='red'
            onClick={() => {
              handleOpenDelete
              handleDelete(selectedRow)
            }}
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={openView} handler={handleOpenView} suppressHydrationWarning>
        <DialogHeader className='justify-between'>
          <Typography variant='h5' color='blue-gray'>
            View Employee
          </Typography>
          <IconButton variant='text' color='blue-gray' onClick={handleOpenView}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <ViewForm rowData={selectedRow} suppressHydrationWarning />
        </DialogBody>
      </Dialog>
      <Dialog open={openAdd} handler={handleOpenAdd} suppressHydrationWarning>
        <DialogHeader className='justify-between'>
          <Typography variant='h5' color='blue-gray'>
            Add Employee
          </Typography>
          <IconButton variant='text' color='blue-gray' onClick={handleOpenAdd}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <AddForm />
        </DialogBody>
      </Dialog>

      <Dialog open={openUpload} handler={handleOpenUpload} suppressHydrationWarning>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='justify-between'>
            <Typography variant='h5' color='blue-gray'>
              Upload File
            </Typography>
            <IconButton variant='text' color='blue-gray' onClick={handleOpenUpload}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </IconButton>
          </DialogHeader>
          <DialogBody>
            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='uploadFile'
                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg
                    className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 16'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                    />
                  </svg>
                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                    <span className='font-semibold'>Click to upload</span> or drag and drop
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>Supports .xlsx</p>
                </div>
                <input
                  id='uploadFile'
                  type='file'
                  onChangeCapture={e => handleFileChange(e)}
                  accept='.xlsx'
                  className='hidden'
                  {...register('files')}
                />
              </label>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button className='w-full' type='submit'>
              Upload
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  )
}

export default Page
