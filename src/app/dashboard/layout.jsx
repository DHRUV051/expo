import dynamic from 'next/dynamic'


const NoSSR = dynamic(() => import('@components/header'), { ssr: false })

const AdminLayout = ({ children }) => {

  

  return (
    <>
      <NoSSR />
      <main suppressHydrationWarning >{children}</main>
    </>
  )
}

export default AdminLayout
