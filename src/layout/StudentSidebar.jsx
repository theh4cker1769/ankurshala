import { NavLink } from 'react-router-dom'
import {
  MdDashboard,
  MdClass,
  MdCalendarToday,
  MdFeedback,
  MdPerson,
  MdBook,
  MdBarChart
} from 'react-icons/md'

const StudentSidebar = () => {
  const logo = '/assets/images/logo.png'

  const menuItems = [
    { to: '/student', label: 'Dashboard', icon: MdDashboard },
    { to: '/student/classes', label: 'Classes', icon: MdClass },
    { to: '/student/calendar', label: 'Calendar', icon: MdCalendarToday },
    { to: '/student/subjects', label: 'Subjects', icon: MdBook },
    { to: '/student/performance', label: 'Performance', icon: MdBarChart },
    { to: '/student/feedback', label: 'Feedback', icon: MdFeedback },
    { to: '/student/profile', label: 'Profile', icon: MdPerson }
  ]

  return (
    <aside className="sidebar student-sidebar">
      <div className="user-details">
        <img src={logo} alt="Logo" />
        <h1>Ankurshala</h1>
        <p>Student Portal</p>
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
                  end={item.to === '/student'}
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

export default StudentSidebar