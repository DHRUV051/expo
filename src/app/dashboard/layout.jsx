import Header from '@components/Header'
import React from 'react'

const AdminLayout = ({ children }) => {
  return (
    <>
      <Header suppressHydrationWarning />
      {children}
    </>
  )
}

export default AdminLayout
