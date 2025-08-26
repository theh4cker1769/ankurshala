import { MdDashboard, MdPeople, MdBook, MdLibraryBooks, MdBarChart, MdMonitor } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const logo = '/assets/images/logo.png'

  const menuItems = [
    { to: '/', label: 'Dashboard', icon: MdDashboard },
    { to: '/user-management', label: 'User Management', icon: MdPeople },
    { to: '/subjects', label: 'Subjects', icon: MdBook },
    { to: '/courses', label: 'Course & Content', icon: MdLibraryBooks },
    { to: '/reports', label: 'Reports', icon: MdBarChart },
    { to: '/monitoring', label: 'Monitoring', icon: MdMonitor },
  ]

  return (
    <aside className="sidebar">
      <div className="user-details">
        <img src={logo} alt="Logo" />
        <h1>Ankurshala</h1>
        <p>On Demand Learning</p>
      </div>
      <nav>
        <ul className="sidebar-menu">
          {menuItems.map(item => {
            const Icon = item.icon
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    'sidebar-item' + (isActive ? ' active' : '')
                  }
                  end={item.to === '/dashboard'}
                  title={item.label}
                >
                  <Icon className="sidebar-icon" />
                  <span className="sidebar-text">{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar