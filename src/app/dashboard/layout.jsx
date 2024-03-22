import Header from '@components/header1'
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
