import { MdPeople, MdPerson, MdBook, MdEventAvailable, MdBarChart, MdMonitor } from 'react-icons/md'

const Dashboard = () => {
  const stats = [
    { id: 'students', label: 'Total Students', value: 1240, icon: <MdPeople /> },
    { id: 'teachers', label: 'Total Teachers', value: 58, icon: <MdPerson /> },
    { id: 'subjects', label: 'Total Subjects', value: 32, icon: <MdBook /> },
    { id: 'bookings', label: 'Total Bookings', value: 310, icon: <MdEventAvailable /> }
  ]

  const quickActions = [
    { id: 'manage-users', label: 'Manage Users', icon: <MdPeople />, onClick: () => console.log('Manage Users') },
    { id: 'manage-subjects', label: 'Manage Subjects', icon: <MdBook />, onClick: () => console.log('Manage Subjects') },
    { id: 'view-reports', label: 'View Reports', icon: <MdBarChart />, onClick: () => console.log('View Reports') },
    { id: 'monitor-activity', label: 'Monitor Activity', icon: <MdMonitor />, onClick: () => console.log('Monitor Activity') }
  ]

  const systemStatus = [
    { id: 'db', label: 'Database', state: 'operational' },
    { id: 'api', label: 'API Service', state: 'operational' },
    { id: 'payment', label: 'Payment Gateway', state: 'degraded' }
  ]

  const recentActivity = [
    { id: 1, text: 'New student registered (Aditi Sharma)', time: '2m ago' },
    { id: 2, text: 'Teacher profile updated (Mr. Rao)', time: '14m ago' },
    { id: 3, text: 'New subject added: Biology', time: '35m ago' },
    { id: 4, text: 'Booking confirmed (Session ID 5432)', time: '1h ago' },
  ]

  return (
    <section className="dashboard">
      <div className="dashboard-hero">
        <div className="dash-badge">Dashboard</div>
        <h1 className="dash-title">
          Welcome back, <span className="dash-user">John Doe</span>
        </h1>
        <p className="dash-sub">
          Here’s a quick overview of what’s happening today.
        </p>
      </div>

      <div className="dashboard-body">
        <div className="dashboard-main">
          <section className="dash-section dashboard-stats">
            <div className="section-head">
              <h2>Platform Overview</h2>
              <span className="section-sub">Key metrics at a glance</span>
            </div>
            <div className="stats-grid">
              {stats.map(s => (
                <div key={s.id} className="stat-card">
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-meta">
                    <span className="stat-label">{s.label}</span>
                    <span className="stat-value">
                      {Intl.NumberFormat().format(s.value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dash-section quick-actions">
            <div className="section-head">
              <h2>Quick Actions</h2>
              <span className="section-sub">Frequent tasks</span>
            </div>
            <div className="qa-grid">
              {quickActions.map(a => (
                <button
                  key={a.id}
                  className="qa-item"
                  type="button"
                  onClick={a.onClick}
                >
                  <span className="qa-icon">{a.icon}</span>
                  <span className="qa-label">{a.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="dash-section system-status">
            <div className="section-head">
              <h2>System Status</h2>
              <span className="section-sub">Service health</span>
            </div>
            <ul className="status-list">
              {systemStatus.map(s => (
                <li key={s.id} className={`status-item state-${s.state}`}>
                  <span className="status-dot" />
                  <span className="status-label">{s.label}</span>
                  <span className="status-state">
                    {s.state === 'operational' ? 'Operational' : s.state === 'degraded' ? 'Degraded' : 'Down'}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="dash-section placeholder-section">
            <div className="section-head">
              <h2>Announcements</h2>
              <span className="section-sub">Latest updates</span>
            </div>
            <div className="section-body empty">
              <p>No announcements yet.</p>
            </div>
          </section>
        </div>

        <aside className="dashboard-aside">
          <section className="dash-section recent-activity">
            <div className="section-head">
              <h2>Recent Activity</h2>
              <span className="section-sub">Live feed</span>
            </div>
            <ul className="activity-list">
              {recentActivity.map(item => (
                <li key={item.id}>
                  <span className="activity-text">{item.text}</span>
                  <span className="activity-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </section>
  )
}

export default Dashboard