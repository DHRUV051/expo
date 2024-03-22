import Header from '@/componenets/Header'
import React from 'react'

const AdminLayout = ({children}) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default AdminLayout