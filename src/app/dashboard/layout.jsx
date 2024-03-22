import Header from '@components/header'
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
