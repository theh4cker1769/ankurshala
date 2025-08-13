import { MdDashboard, MdPeople, MdBook, MdLibraryBooks, MdBarChart, MdMonitor } from 'react-icons/md'

const Sidebar = () => {

  // images
  const userProfile = '/assets/images/sidebar/user-profile.png'

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
      <ul className="sidebar-menu">
        <li>
          <MdDashboard className="sidebar-icon" />
          <span>Dashboard</span>
        </li>
        <li>
          <MdPeople className="sidebar-icon" />
          <span>User Management</span>
        </li>
        <li>
          <MdBook className="sidebar-icon" />
          <span>Subjects</span>
        </li>
        <li>
          <MdLibraryBooks className="sidebar-icon" />
          <span>Course & Content</span>
        </li>
        <li>
          <MdBarChart className="sidebar-icon" />
          <span>Reports</span>
        </li>
        <li>
          <MdMonitor className="sidebar-icon" />
          <span>Monitoring</span>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar