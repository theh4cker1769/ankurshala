import { MdDashboard, MdPeople, MdBook, MdLibraryBooks, MdBarChart, MdMonitor } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  // images
  const userProfile = '/assets/images/sidebar/user-profile.png'

  // central menu config
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
        <div className="user-avatar">
          <img src={userProfile} alt="User Profile" />
        </div>
        <div className="user-meta">
          <span className="user-name">John Doe</span>
          <span className="user-role">Administrator</span>
        </div>
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
                >
                  <Icon className="sidebar-icon" />
                  <span>{item.label}</span>
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