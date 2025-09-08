//// filepath: c:\My Laptop\Projects\Ankurshala\app\src\pages\Course.jsx
import { useState, useMemo } from 'react'
import {
  MdLibraryBooks,
  MdFileUpload,
  MdAddCircle,
  MdEdit,
  MdDelete,
  MdAccessTime,
  MdClose,
  MdAdd,
  MdCloudUpload,
  MdInfo
} from 'react-icons/md'

const Course = () => {
  // Sample content items (now state so new items persist)
  const [contentItems, setContentItems] = useState([
    { id: 1, topic: 'Algebraic Expressions Basics', board: 'CBSE', classLevel: '8', subject: 'Mathematics', chapter: 'Algebra', description: 'Introduction to variables, coefficients and simple expressions.', expectedTime: 30, resourceUrl: '', suggested: [], updatedAt: Date.now() - 1000 * 60 * 60 * 5 },
    { id: 2, topic: 'Light & Reflection', board: 'ICSE', classLevel: '9', subject: 'Physics', chapter: 'Light', description: 'Understanding reflection laws and mirror ray diagrams.', expectedTime: 40, resourceUrl: '', suggested: [], updatedAt: Date.now() - 1000 * 60 * 60 * 27 },
    { id: 3, topic: 'Cell Structure Overview', board: 'CBSE', classLevel: '9', subject: 'Biology', chapter: 'Cells', description: 'Organelles, cell membrane transport and basic microscopy.', expectedTime: 35, resourceUrl: '', suggested: [], updatedAt: Date.now() - 1000 * 60 * 12 },
    { id: 4, topic: 'World War II Causes', board: 'State', classLevel: '10', subject: 'History', chapter: 'WWII', description: 'Geopolitical tensions, alliances and triggering events.', expectedTime: 50, resourceUrl: '', suggested: [], updatedAt: Date.now() - 1000 * 60 * 60 * 50 },
    { id: 5, topic: 'Chemical Reactions Types', board: 'ICSE', classLevel: '10', subject: 'Chemistry', chapter: 'Reactions', description: 'Combination, decomposition, displacement and redox basics.', expectedTime: 45, resourceUrl: '', suggested: [], updatedAt: Date.now() - 1000 * 60 * 90 }
  ])

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

  // Modal states
  const [createOpen, setCreateOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)

  // Create form
  const [createForm, setCreateForm] = useState({
    board: '',
    classLevel: '',
    subject: '',
    chapter: '',
    topic: '',
    description: '',
    expectedTime: '',
    resourceUrl: '',
    suggestedInput: '',
    suggested: []
  })

  const openCreate = () => {
    setCreateForm({
      board: boards[0] || '',
      classLevel: classes[0] || '',
      subject: subjects[0] || '',
      chapter: '',
      topic: '',
      description: '',
      expectedTime: '',
      resourceUrl: '',
      suggestedInput: '',
      suggested: []
    })
    setCreateOpen(true)
  }
  const closeCreate = () => setCreateOpen(false)

  const handleCreateChange = e => {
    const { name, value } = e.target
    setCreateForm(f => ({ ...f, [name]: value }))
  }
  const addSuggested = () => {
    if (!createForm.suggestedInput.trim()) return
    setCreateForm(f => ({
      ...f,
      suggested: [...f.suggested, f.suggestedInput.trim()],
      suggestedInput: ''
    }))
  }
  const removeSuggested = idx =>
    setCreateForm(f => ({
      ...f,
      suggested: f.suggested.filter((_, i) => i !== idx)
    }))

  const handleCreateSubmit = e => {
    e.preventDefault()
    if (!createForm.topic || !createForm.board || !createForm.classLevel || !createForm.subject) return
    setContentItems(prev => [
      ...prev,
      {
        id: Date.now(),
        topic: createForm.topic.trim(),
        board: createForm.board,
        classLevel: createForm.classLevel,
        subject: createForm.subject,
        chapter: createForm.chapter.trim(),
        description: createForm.description.trim(),
        expectedTime: Number(createForm.expectedTime) || 0,
        resourceUrl: createForm.resourceUrl.trim(),
        suggested: createForm.suggested,
        updatedAt: Date.now()
      }
    ])
    setCreateOpen(false)
  }

  // Import form
  const [importForm, setImportForm] = useState({
    board: '',
    classLevel: '',
    subject: '',
    file: null
  })
  const handleImportChange = e => {
    const { name, value } = e.target
    setImportForm(f => ({ ...f, [name]: value }))
  }
  const handleImportFile = e =>
    setImportForm(f => ({ ...f, file: e.target.files?.[0] || null }))
  const openImport = () => {
    setImportForm({
      board: boards[0] || '',
      classLevel: classes[0] || '',
      subject: subjects[0] || '',
      file: null
    })
    setImportOpen(true)
  }
  const closeImport = () => setImportOpen(false)
  const submitImport = e => {
    e.preventDefault()
    if (!importForm.board || !importForm.classLevel || !importForm.subject || !importForm.file) return
    console.log('Import placeholder', importForm)
    setImportOpen(false)
  }

  // Actions (placeholder)
  const handleImport = openImport
  const handleCreate = openCreate

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

      {createOpen && (
        <div className="courses-modal-overlay" role="dialog" aria-modal="true">
          <div className="courses-modal-shell">
            <div className="courses-modal-head">
              <h2>Create New Content</h2>
              <button type="button" className="icon-close" onClick={closeCreate} aria-label="Close">
                <MdClose />
              </button>
            </div>
            <form className="courses-modal-body" onSubmit={handleCreateSubmit}>
              <div className="courses-form-grid">
                <div className="cm-control">
                  <label>Educational Board<span>*</span></label>
                  <select name="board" value={createForm.board} onChange={handleCreateChange} required>
                    <option value="">Select</option>
                    {boards.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="cm-control">
                  <label>Class Level<span>*</span></label>
                  <select name="classLevel" value={createForm.classLevel} onChange={handleCreateChange} required>
                    <option value="">Select</option>
                    {classes.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="cm-control">
                  <label>Subject<span>*</span></label>
                  <select name="subject" value={createForm.subject} onChange={handleCreateChange} required>
                    <option value="">Select</option>
                    {subjects.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="cm-control">
                  <label>Chapter</label>
                  <input name="chapter" value={createForm.chapter} onChange={handleCreateChange} placeholder="e.g. Algebra" />
                </div>
                <div className="cm-control wide">
                  <label>Topic<span>*</span></label>
                  <input name="topic" value={createForm.topic} onChange={handleCreateChange} required placeholder="Topic title" />
                </div>
                <div className="cm-control wide">
                  <label>Brief Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={createForm.description}
                    onChange={handleCreateChange}
                    placeholder="Short description..."
                  />
                </div>
                <div className="cm-control">
                  <label>Expected Time (min)</label>
                  <input
                    name="expectedTime"
                    type="number"
                    min="0"
                    value={createForm.expectedTime}
                    onChange={handleCreateChange}
                    placeholder="30"
                  />
                </div>
                <div className="cm-control">
                  <label>Resource URL</label>
                  <input
                    name="resourceUrl"
                    value={createForm.resourceUrl}
                    onChange={handleCreateChange}
                    placeholder="https://..."
                  />
                </div>
                <div className="cm-control wide">
                  <label>Suggested Topics</label>
                  <div className="suggested-inline">
                    <input
                      name="suggestedInput"
                      value={createForm.suggestedInput}
                      onChange={handleCreateChange}
                      placeholder="Type topic & add"
                    />
                    <button
                      type="button"
                      className="mini-add-btn"
                      onClick={addSuggested}
                      disabled={!createForm.suggestedInput.trim()}
                    >
                      <MdAdd /> Add
                    </button>
                  </div>
                  {createForm.suggested.length > 0 && (
                    <ul className="suggested-list">
                      {createForm.suggested.map((t, i) => (
                        <li key={i}>
                          {t}
                          <button
                            type="button"
                            className="x-btn"
                            onClick={() => removeSuggested(i)}
                            aria-label="Remove"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="courses-modal-actions">
                <button type="button" className="btn secondary" onClick={closeCreate}>Cancel</button>
                <button type="submit" className="btn primary" disabled={!createForm.topic || !createForm.board || !createForm.classLevel || !createForm.subject}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {importOpen && (
        <div className="courses-modal-overlay" role="dialog" aria-modal="true">
          <div className="courses-modal-shell">
            <div className="courses-modal-head">
              <h2>Import Content from Excel / CSV</h2>
              <button type="button" className="icon-close" onClick={closeImport} aria-label="Close">
                <MdClose />
              </button>
            </div>
            <form className="courses-modal-body" onSubmit={submitImport}>
              <div className="courses-form-grid">
                <div className="cm-control">
                  <label>Educational Board<span>*</span></label>
                  <select name="board" value={importForm.board} onChange={handleImportChange} required>
                    <option value="">Select</option>
                    {boards.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="cm-control">
                  <label>Class Level<span>*</span></label>
                  <select name="classLevel" value={importForm.classLevel} onChange={handleImportChange} required>
                    <option value="">Select</option>
                    {classes.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="cm-control">
                  <label>Subject<span>*</span></label>
                  <select name="subject" value={importForm.subject} onChange={handleImportChange} required>
                    <option value="">Select</option>
                    {subjects.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="cm-control wide note-box">
                  <p><MdInfo /> Select these dropdowns to associate imported rows; they will be applied to every row unless file overrides (optional columns: board, class, subject, chapter, topic, description, expectedTime, resourceUrl, suggestedTopics).</p>
                </div>
                <div className="cm-control wide instructions">
                  <ul>
                    <li>Ensure headers match: topic, chapter, description, expectedTime, resourceUrl, suggestedTopics.</li>
                    <li>Comma or semicolon separated suggestedTopics.</li>
                    <li>expectedTime should be number (minutes).</li>
                    <li>Max 1000 rows per upload.</li>
                  </ul>
                </div>
                <div className="cm-control wide">
                  <label>Upload File<span>*</span></label>
                  <div
                    className={'drop-zone' + (importForm.file ? ' has-file' : '')}
                    onDragOver={e => { e.preventDefault() }}
                    onDrop={e => {
                      e.preventDefault()
                      if (e.dataTransfer.files?.[0]) handleImportFile({ target: { files: e.dataTransfer.files } })
                    }}
                  >
                    <MdCloudUpload />
                    <p>{importForm.file ? importForm.file.name : 'Drag & drop Excel / CSV here or click to browse'}</p>
                    <input
                      type="file"
                      accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      onChange={handleImportFile}
                    />
                  </div>
                </div>
              </div>
              <div className="courses-modal-actions">
                <button type="button" className="btn secondary" onClick={closeImport}>Cancel</button>
                <button type="submit" className="btn primary" disabled={!importForm.board || !importForm.classLevel || !importForm.subject || !importForm.file}>Import</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Course