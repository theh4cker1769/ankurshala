import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout