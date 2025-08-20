//// filepath: c:\My Laptop\Projects\Ankurshala\app\src\pages\Course.jsx
import { useState, useMemo } from 'react'
import {
  MdLibraryBooks,
  MdFileUpload,
  MdAddCircle,
  MdEdit,
  MdDelete,
  MdAccessTime
} from 'react-icons/md'

const Course = () => {
  // Sample content items (replace with API)
  const contentItems = [
    {
      id: 1,
      topic: 'Algebraic Expressions Basics',
      board: 'CBSE',
      classLevel: '8',
      subject: 'Mathematics',
      description: 'Introduction to variables, coefficients and simple expressions.',
      updatedAt: Date.now() - 1000 * 60 * 60 * 5
    },
    {
      id: 2,
      topic: 'Light & Reflection',
      board: 'ICSE',
      classLevel: '9',
      subject: 'Physics',
      description: 'Understanding reflection laws and mirror ray diagrams.',
      updatedAt: Date.now() - 1000 * 60 * 60 * 27
    },
    {
      id: 3,
      topic: 'Cell Structure Overview',
      board: 'CBSE',
      classLevel: '9',
      subject: 'Biology',
      description: 'Organelles, cell membrane transport and basic microscopy.',
      updatedAt: Date.now() - 1000 * 60 * 12
    },
    {
      id: 4,
      topic: 'World War II Causes',
      board: 'State',
      classLevel: '10',
      subject: 'History',
      description: 'Geopolitical tensions, alliances and triggering events.',
      updatedAt: Date.now() - 1000 * 60 * 60 * 50
    },
    {
      id: 5,
      topic: 'Chemical Reactions Types',
      board: 'ICSE',
      classLevel: '10',
      subject: 'Chemistry',
      description: 'Combination, decomposition, displacement and redox basics.',
      updatedAt: Date.now() - 1000 * 60 * 90
    }
  ]

  // Filters
  const [boardFilter, setBoardFilter] = useState('all')
  const [classFilter, setClassFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [search, setSearch] = useState('')

  // Derived options
  const boards = useMemo(
    () => Array.from(new Set(contentItems.map(i => i.board))).sort(),
    [contentItems]
  )
  const classes = useMemo(
    () => Array.from(new Set(contentItems.map(i => i.classLevel))).sort((a,b)=>Number(a)-Number(b)),
    [contentItems]
  )
  const subjects = useMemo(
    () => Array.from(new Set(contentItems.map(i => i.subject))).sort(),
    [contentItems]
  )

  const relativeTime = (ts) => {
    const diff = Date.now() - ts
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  }

  const filtered = contentItems
    .filter(i => (boardFilter === 'all' || i.board === boardFilter))
    .filter(i => (classFilter === 'all' || i.classLevel === classFilter))
    .filter(i => (subjectFilter === 'all' || i.subject === subjectFilter))
    .filter(i => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return (
        i.topic.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.subject.toLowerCase().includes(q) ||
        i.board.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.updatedAt - a.updatedAt
      if (sortBy === 'oldest') return a.updatedAt - b.updatedAt
      if (sortBy === 'az') return a.topic.localeCompare(b.topic)
      if (sortBy === 'za') return b.topic.localeCompare(a.topic)
      return 0
    })

  // Actions (placeholder)
  const handleImport = () => console.log('Import content')
  const handleCreate = () => console.log('Create content')
  const handleEdit = id => console.log('Edit content id:', id)
  const handleDelete = id => console.log('Delete content id:', id)

  const resetFilters = () => {
    setBoardFilter('all')
    setClassFilter('all')
    setSubjectFilter('all')
    setSortBy('newest')
    setSearch('')
  }

  return (
    <section className="courses-page">
      <div className="courses-hero">
        <div className="courses-badge">
          <MdLibraryBooks /> Course Content
        </div>
        <div className="courses-hero-head">
          <h1 className="courses-title">Learning Content Library</h1>
          <div className="courses-hero-actions">
            <button type="button" className="btn secondary hero-btn" onClick={handleImport}>
              <MdFileUpload /> Import
            </button>
            <button type="button" className="btn primary hero-btn" onClick={handleCreate}>
              <MdAddCircle /> Create Content
            </button>
          </div>
        </div>
        <p className="courses-sub">
          Manage topics and lessons across boards, classes and subjects.
        </p>
      </div>

      <div className="courses-panel dash-section">
        <div className="courses-filters-row">
          <div className="filter-control">
            <label>Educational Board</label>
            <select value={boardFilter} onChange={e => setBoardFilter(e.target.value)}>
              <option value="all">All Boards</option>
              {boards.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="filter-control">
            <label>Class Level</label>
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)}>
              <option value="all">All Classes</option>
              {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>
            <div className="filter-control">
              <label>Subject</label>
              <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
                <option value="all">All Subjects</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="filter-control">
              <label>Sort By</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A - Z</option>
                <option value="za">Z - A</option>
              </select>
            </div>
            <div className="search-control wide">
              <label>Search</label>
              <div className="search-inline">
                <input
                  type="text"
                  placeholder="Search topic / description / subject..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {(boardFilter !== 'all' || classFilter !== 'all' || subjectFilter !== 'all' || sortBy !== 'newest' || search.trim()) && (
                  <button type="button" className="mini-reset-btn" onClick={resetFilters}>
                    Reset
                  </button>
                )}
              </div>
            </div>
        </div>

        <div className="courses-grid-head">
          <h2>Content</h2>
          <span className="cg-count">{filtered.length} shown</span>
        </div>

        {filtered.length === 0 ? (
          <div className="courses-empty">
            <p>No content matches current filters.</p>
          </div>
        ) : (
          <div className="course-card-grid">
            {filtered.map(item => (
              <div key={item.id} className="course-card">
                <div className="course-card-top">
                  <div className="course-icon">
                    <MdLibraryBooks />
                  </div>
                  <div className="course-meta">
                    <h3 className="course-topic">{item.topic}</h3>
                    <div className="course-tags">
                      <span className="tag board">{item.board}</span>
                      <span className="tag class">Class {item.classLevel}</span>
                      <span className="tag subject">{item.subject}</span>
                    </div>
                    <p className="course-desc">{item.description}</p>
                  </div>
                </div>
                <div className="course-foot">
                  <span className="course-time">
                    <MdAccessTime /> {relativeTime(item.updatedAt)}
                  </span>
                  <div className="course-actions">
                    <button
                      type="button"
                      className="mini-btn ghost"
                      onClick={() => handleEdit(item.id)}
                    >
                      <MdEdit /> Edit
                    </button>
                    <button
                      type="button"
                      className="mini-btn outline danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Course