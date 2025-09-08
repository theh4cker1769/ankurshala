import {
  MdEventAvailable,
  MdCheckCircle,
  MdBookOnline,
  MdClass,
  MdCalendarToday,
  MdFeedback,
  MdPerson,
  MdBarChart
} from 'react-icons/md'

const StudentDashboard = () => {
  // Quick stats (replace with API data)
  const stats = [
    { id: 'upcoming', label: 'Upcoming Classes', value: 1, icon: <MdEventAvailable /> },
    { id: 'completed', label: 'Completed Classes', value: 18, icon: <MdCheckCircle /> },
    { id: 'bookings', label: 'Total Bookings', value: 22, icon: <MdBookOnline /> }
  ]

  // Next class (null if none)
  const nextClass = {
    id: 101,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    date: '2025-09-10',
    time: '17:00',
    duration: 60,
    tutor: 'Ms. Rao',
    room: 'Virtual Room 3'
  }
  // const nextClass = null // Uncomment to test empty state

  const quickActions = [
    { id: 'browse', label: 'Browse Classes', icon: <MdClass />, onClick: () => console.log('Browse Classes') },
    { id: 'calendar', label: 'View Calendar', icon: <MdCalendarToday />, onClick: () => console.log('View Calendar') },
    { id: 'feedback', label: 'Give Feedback', icon: <MdFeedback />, onClick: () => console.log('Give Feedback') },
    { id: 'profile', label: 'Edit Profile', icon: <MdPerson />, onClick: () => console.log('Edit Profile') }
  ]

  const recentActivity = [
    { id: 1, text: 'Joined live class: Physics - Light & Reflection', time: '12m ago' },
    { id: 2, text: 'Completed assignment: Algebra Basics', time: '45m ago' },
    { id: 3, text: 'Booked new session: Chemistry Reactions', time: '1h ago' }
  ]

  return (
    <section className="dashboard student-dashboard">
      <div className="dashboard-hero">
        <div className="dash-badge">Dashboard</div>
        <h1 className="dash-title">
          Welcome back, <span className="dash-user">Student</span>
        </h1>
        <p className="dash-sub">
          Track your upcoming classes, progress and recent activity.
        </p>
      </div>

      <div className="dashboard-body">
        <div className="dashboard-main">

          {/* Quick Stats */}
            <section className="dash-section dashboard-stats">
              <div className="section-head">
                <h2>Your Learning Overview</h2>
                <span className="section-sub">Current progress</span>
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

          {/* Upcoming Class */}
          <section className="dash-section upcoming-class">
            <div className="section-head">
              <h2>Upcoming Class</h2>
              <span className="section-sub">Your next session</span>
            </div>
            {nextClass ? (
              <div className="next-class">
                <div className="nc-row">
                  <span className="nc-label">Subject</span>
                  <span className="nc-value">{nextClass.subject}</span>
                </div>
                <div className="nc-row">
                  <span className="nc-label">Topic</span>
                  <span className="nc-value">{nextClass.topic}</span>
                </div>
                <div className="nc-row">
                  <span className="nc-label">Tutor</span>
                  <span className="nc-value">{nextClass.tutor}</span>
                </div>
                <div className="nc-row">
                  <span className="nc-label">Date & Time</span>
                  <span className="nc-value">
                    {nextClass.date} • {nextClass.time} ({nextClass.duration}m)
                  </span>
                </div>
                <div className="nc-row">
                  <span className="nc-label">Room</span>
                  <span className="nc-value">{nextClass.room}</span>
                </div>
                <div className="nc-actions">
                  <button type="button" className="mini-btn primary">
                    Join Class
                  </button>
                  <button type="button" className="mini-btn outline">
                    Reschedule
                  </button>
                </div>
              </div>
            ) : (
              <div className="section-body empty">
                <div>
                  <p>No upcoming class scheduled.</p>
                  <button type="button" className="btn primary" onClick={() => console.log('Book')}>
                    Book Class Now
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Quick Actions */}
          <section className="dash-section quick-actions">
            <div className="section-head">
              <h2>Quick Actions</h2>
              <span className="section-sub">Do more</span>
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

          {/* Placeholder / Progress */}
          <section className="dash-section placeholder-section">
            <div className="section-head">
              <h2>Performance Overview</h2>
              <span className="section-sub">Coming soon</span>
            </div>
            <div className="section-body empty">
              <p>Analytics module coming soon.</p>
            </div>
          </section>
        </div>

        <aside className="dashboard-aside">
          <section className="dash-section recent-activity">
            <div className="section-head">
              <h2>Recent Activity</h2>
              <span className="section-sub">Your latest actions</span>
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

          <section className="dash-section support-box">
            <div className="section-head">
              <h2>Need Help?</h2>
              <span className="section-sub">Support</span>
            </div>
            <div className="section-body empty">
              <p>Contact support or view FAQs.</p>
            </div>
          </section>
        </aside>
      </div>
    </section>
  )
}

export default StudentDashboard