'use client'
import Image from 'next/image'
import Logo from '../../public/sk_logo.png'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import axios from 'axios'
import { MdMenu } from 'react-icons/md'
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'

const Header = () => {
  const [open, setOpen] = useState(false)
  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)
  const pathname = usePathname()
  const router = useRouter()
  const [profile, setProfile] = useState([])

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/logout`)
      if (response.data.statusCode === 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('id')

        return router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleProfile = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/${localStorage.getItem('id')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    setProfile(response.data.data)
  }

  useEffect(() => {
    handleProfile()
  }, [])

  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage

  return (
    <>
      <div className='navbar'>
        <Image src={Logo} alt='sk_logo' width={60} height={60} />

        {isLocalStorageAvailable && localStorage.getItem('role') === 'Admin' && (
          <div className='desktopNavbar'>
            <ul className='list'>
              <li className='list-item'>
                {localStorage.getItem('role') === 'Admin' && (
                  <Link href={'/dashboard'} className={clsx(pathname === '/dashboard' ? 'active' : '')}>
                    Employee
                  </Link>
                )}
              </li>
              <li className='list-item'>
                <Link href={'/dashboard/student'} className={clsx(pathname === '/dashboard/student' ? 'active' : '')}>
                  Student
                </Link>
              </li>
            </ul>
          </div>
        )}


        {isLocalStorageAvailable && (
          <div className='mobileNavbar '>
            <div className='flex space-x-4 items-center'>
              <h1 className='text-black text-[16px] font-bold'>Hello {profile.name}!</h1>

              <div className='mt-2'>
                <button onClick={openDrawer}>
                  <MdMenu size={30} />
                </button>
                <Drawer size={350} placement='right' className='w-full' open={open} onClose={closeDrawer}>
                  <div className='mb-2 flex items-center justify-between p-4'>
                    <Typography variant='h5' color='blue-gray'>
                      Menu
                    </Typography>
                    <IconButton variant='text' color='blue-gray' onClick={closeDrawer}>
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
                  </div>
                  <List>
                    {isLocalStorageAvailable && localStorage.getItem('role') === 'Admin' && (
                      <ListItem className=''>
                        <Link href={'/dashboard'} className={clsx(pathname === '/dashboard' ? 'active' : '')}>
                          Employee
                        </Link>
                      </ListItem>
                    )}
                    {isLocalStorageAvailable && localStorage.getItem('role') === 'Admin' && (
                      <ListItem>
                        <Link
                          href={'/dashboard/student'}
                          className={clsx(pathname === '/dashboard/student' ? 'active' : '')}
                        >
                          Student
                        </Link>
                      </ListItem>
                    )}

                    <ListItem>
                      <Button className='' onClick={() => handleLogout()}>
                        Log Out
                      </Button>
                    </ListItem>
                  </List>
                </Drawer>
              </div>
            </div>
          </div>
        )}

        {isLocalStorageAvailable && (
          <div className='desktopNavbar'>
            <div className='flex space-x-8 items-center flex-row'>
              <h1 className='text-black text-[24px] font-bold'>Hello {profile.name}!</h1>
              <div className=''>
              <Button onClick={() => handleLogout()}>Log Out</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Header
