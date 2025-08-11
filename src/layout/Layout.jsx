import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Outlet />
      </main>
    </>
  )
}

export default Layout