'use client'
import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Button,
  DialogFooter,
  Typography,
  IconButton
} from '@material-tailwind/react'
import { FaEye } from 'react-icons/fa'
import { MdDelete, MdEdit } from 'react-icons/md'
import StudentCreateform from '@components/forms/student/student-create-form'
import StudentView from '@components/forms/student/view-student'
import EditStudentCreateForm from '@components/forms/student/update-student-form'
import SearchForm from '@components/forms/search'
import Loading from '@components/globals/loading-page'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRow, setSelectedRow] = useState(null)
  const [view, setView] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageRole = localStorage.getItem('role')
      const localStorageToken = localStorage.getItem('token')
      if (!localStorageToken || !localStorageRole) {
        router.push('/login')
      }
    }
  }, [router])
  
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Front Desk') {
        setView(true)
        fetchUsers(currentPage, perPage)
      }
    }
  }, [currentPage, perPage])

  const fetchUsers = async (currentPage, perPage) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/student?page=${currentPage}&items_per_page=${perPage}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setTotalRows(response.data.data.payload.pagination.total)
      setData(response.data.data.studentData)
      setFilteredData(response.data.data.studentData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const result = data.filter(item => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.u_id.toLowerCase().includes(search.toLowerCase()) ||
        item.student_countries
          .map(country => country.country.name.toLowerCase())
          .join(', ')
          .includes(search.toLowerCase()) ||
        item.student_exams
          .map(exam => exam.exam.name.toLowerCase())
          .join(', ')
          .includes(search.toLowerCase())
      )
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

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage)
    setCurrentPage(page)
  }

  const columns = [
    {
      name: 'Id',
      selector: row => row.u_id,
      sortable: true
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email
    },
    {
      name: 'Countries',
      selector: row => row.student_countries.map(country => country.country.name).join(', '),
      sortable: true
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
      }
    }
  ]

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
        fontWeight: 700,
        paddingLeft: '0px 8px'
      }
    }
  }

  return (
    <>
      {view ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className='lg:my-[50px] my-[20px] px-[20px] lg:px-[100px] z-10'>
                <DataTable
                  title='Student'
                  columns={columns}
                  progressPending={loading}
                  data={filteredData}
                  fixedHeader
                  fixedHeaderScrollHeight='600px'
                  className='scrollbar'
                  selectableRows
                  selectableRowsHighlight
                  paginationTotalRows={totalRows}
                  paginationRowsPerPageOptions={[10, 25, 50, 100]}
                  pagination
                  paginationServer
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
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
                  actions={<Button onClick={() => setOpenAdd(!openAdd)}>Add</Button>}
                  customStyles={tableCustomStyles}
                />
              </div>
            </>
          )}

          {/* Edit Student Modal */}
          <Dialog open={openEdit} handler={handleOpenEdit}>
            <DialogHeader className='justify-between'>
              <Typography variant='h5' color='blue-gray'>
                Edit Student
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
            <DialogBody className='overflow-scroll h-[600px] scrollbar'>
              <EditStudentCreateForm rowData={selectedRow} />
            </DialogBody>
          </Dialog>

          {/* Delete Student Modal */}
          <Dialog open={openDelete} handler={handleOpenDelete}>
            <DialogHeader className='justify-between'>
              <Typography variant='h5' color='blue-gray'>
                Delete Student
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
              <p>Are you sure you want to delete this Student?</p>
            </DialogBody>
            <DialogFooter>
              <Button variant='text' color='green' onClick={handleOpenDelete}>
                <span>Cancel</span>
              </Button>
              <Button variant='gradient' color='red' onClick={handleOpenDelete}>
                <span>Delete</span>
              </Button>
            </DialogFooter>
          </Dialog>

          {/* View Student Modal */}
          <Dialog open={openView} handler={handleOpenView}>
            <DialogHeader className='justify-between'>
              <Typography variant='h5' color='blue-gray'>
                View Student
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
              <StudentView studentData={selectedRow} />
            </DialogBody>
          </Dialog>

          {/* Add Student Modal */}
          <Dialog open={openAdd} handler={handleOpenAdd}>
            <DialogHeader className='justify-between'>
              <Typography variant='h5' color='blue-gray'>
                Add Student
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
            <DialogBody className='h-[500px] overflow-scroll scrollbar '>
              <StudentCreateform />
            </DialogBody>
          </Dialog>
        </>
      ) : (
        <>
          <div className='flex mt-[50px] px-[30px] md:px-[50px] '>
            <SearchForm />
          </div>
        </>
      )}
    </>
  )
}

export default Page
