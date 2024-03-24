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
  const [selectedRow, setSelectedRow] = useState(null)

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageRole = localStorage.getItem('role')
      const localStorageToken = localStorage.getItem('token')
      if (!localStorageToken || !localStorageRole) {
        router.push('/login');
      }
    }
  }, [router])


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
      {loading ? (
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
              actions={<Button onClick={() => setOpenAdd(!openAdd)}>Add</Button>}
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
    </>
  )
}

export default Page
