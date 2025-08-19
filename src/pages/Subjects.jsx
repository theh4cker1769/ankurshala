//// filepath: c:\My Laptop\Projects\Ankurshala\app\src\pages\Subjects.jsx
import { useState, useMemo } from 'react'
import {
    MdBook,
    MdLock,
    MdLockOpen,
    MdEdit,
    MdCheckCircle,
    MdCancel
} from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'

const Subjects = () => {
    // Sample subject data (replace with API)
    const subjectData = [
        {
            id: 1,
            name: 'Mathematics',
            description: 'Core numeracy & problem solving fundamentals.',
            board: 'CBSE',
            grades: ['6', '7', '8'],
            active: true
        },
        {
            id: 2,
            name: 'Physics',
            description: 'Mechanics, waves & introductory electricity.',
            board: 'ICSE',
            grades: ['9', '10'],
            active: true
        },
        {
            id: 3,
            name: 'Biology',
            description: 'Life sciences & human physiology basics.',
            board: 'CBSE',
            grades: ['8', '9'],
            active: false
        },
        {
            id: 4,
            name: 'History',
            description: 'Ancient to modern eras & civilizations overview.',
            board: 'State',
            grades: ['7', '8', '9'],
            active: true
        },
        {
            id: 5,
            name: 'Chemistry',
            description: 'Atoms, compounds and reactions essentials.',
            board: 'ICSE',
            grades: ['9', '10'],
            active: true
        },
        {
            id: 6,
            name: 'Geography',
            description: 'Physical regions, mapping & climate systems.',
            board: 'CBSE',
            grades: ['6', '7'],
            active: false
        }
    ]

    // Filter state
    const [boardFilter, setBoardFilter] = useState('all')
    const [gradeFilter, setGradeFilter] = useState('all')
    const [subjectFilter, setSubjectFilter] = useState('all')
    const [search, setSearch] = useState('')

    // Derived lists
    const boards = useMemo(
        () => Array.from(new Set(subjectData.map(s => s.board))).sort(),
        [subjectData]
    )
    const grades = useMemo(
        () =>
            Array.from(
                new Set(subjectData.flatMap(s => s.grades))
            ).sort((a, b) => Number(a) - Number(b)),
        [subjectData]
    )
    const subjectNames = useMemo(
        () =>
            Array.from(new Set(subjectData.map(s => s.name))).sort(),
        [subjectData]
    )

    // Counters
    const totalSubjects = subjectData.length
    const activeSubjects = subjectData.filter(s => s.active).length
    const inactiveSubjects = totalSubjects - activeSubjects
    const educationalBoards = boards.length

    // Filtered subjects
    const filtered = subjectData.filter(s => {
        if (boardFilter !== 'all' && s.board !== boardFilter) return false
        if (gradeFilter !== 'all' && !s.grades.includes(gradeFilter)) return false
        if (subjectFilter !== 'all' && s.name !== subjectFilter) return false
        if (search.trim()) {
            const q = search.toLowerCase()
            if (
                !(
                    s.name.toLowerCase().includes(q) ||
                    s.description.toLowerCase().includes(q) ||
                    s.board.toLowerCase().includes(q)
                )
            )
                return false
        }
        return true
    })

    // Actions (placeholder)
    const handleAddSubject = () => {
        console.log('Add Subject')
    }
    const handleToggleActive = id => {
        console.log('Toggle active subject id:', id)
    }
    const handleEdit = id => {
        console.log('Edit subject id:', id)
    }

    return (
        <section className="subjects-page">
            {/* Hero */}
            <div className="subjects-hero">
                <div className="subjects-badge">
                    <MdBook /> Subjects
                </div>
                <div className="subjects-hero-head">
                    <h1 className="subjects-title">Subjects & Academic Taxonomy</h1>
                    <button
                        type="button"
                        className="btn primary add-subject-btn"
                        onClick={handleAddSubject}
                    >
                        <FaPlus /> Add Subject
                    </button>
                </div>
                <p className="subjects-sub">
                    Manage curriculum subjects, activation status and board/grade mappings.
                </p>
            </div>

            {/* Counters */}
            <div className="subjects-counters dash-section">
                <div className="subjects-counter-grid">
                    <div className="scard">
                        <div className="scard-icon"><MdBook /></div>
                        <div className="scard-meta">
                            <span className="scard-label">Total Subjects</span>
                            <span className="scard-value">{totalSubjects}</span>
                        </div>
                    </div>
                    <div className="scard">
                        <div className="scard-icon active"><MdCheckCircle /></div>
                        <div className="scard-meta">
                            <span className="scard-label">Active</span>
                            <span className="scard-value">{activeSubjects}</span>
                        </div>
                    </div>
                    <div className="scard">
                        <div className="scard-icon inactive"><MdCancel /></div>
                        <div className="scard-meta">
                            <span className="scard-label">Inactive</span>
                            <span className="scard-value">{inactiveSubjects}</span>
                        </div>
                    </div>
                    <div className="scard">
                        <div className="scard-icon boards"><MdBook /></div>
                        <div className="scard-meta">
                            <span className="scard-label">Educational Boards</span>
                            <span className="scard-value">{educationalBoards}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="subjects-panel dash-section">
                <div className="subjects-filters-row">
                    <div className="filter-control">
                        <label>Educational Board</label>
                        <select
                            value={boardFilter}
                            onChange={e => setBoardFilter(e.target.value)}
                        >
                            <option value="all">All Boards</option>
                            {boards.map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-control">
                        <label>Grade Level</label>
                        <select
                            value={gradeFilter}
                            onChange={e => setGradeFilter(e.target.value)}
                        >
                            <option value="all">All Grades</option>
                            {grades.map(g => (
                                <option key={g} value={g}>Grade {g}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-control">
                        <label>Subject</label>
                        <select
                            value={subjectFilter}
                            onChange={e => setSubjectFilter(e.target.value)}
                        >
                            <option value="all">All Subjects</option>
                            {subjectNames.map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-control">
                        <label>Search</label>
                        <div className="search-inline">
                            <input
                                type="text"
                                placeholder="Name / description / board..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {(boardFilter !== 'all' ||
                                gradeFilter !== 'all' ||
                                subjectFilter !== 'all' ||
                                search.trim()) && (
                                    <button
                                        type="button"
                                        className="mini-reset-btn"
                                        onClick={() => {
                                            setBoardFilter('all')
                                            setGradeFilter('all')
                                            setSubjectFilter('all')
                                            setSearch('')
                                        }}
                                    >
                                        Reset
                                    </button>
                                )}
                        </div>
                    </div>
                </div>

                <div className="subjects-grid">
                    <div className="subjects-grid-head">
                        <h2>Subjects</h2>
                        <span className="sg-count">{filtered.length} shown</span>
                    </div>
                    {filtered.length === 0 ? (
                        <div className="subjects-empty">
                            <p>No subjects match the current filters.</p>
                        </div>
                    ) : (
                        <div className="subject-card-grid">
                            {filtered.map(s => (
                                <div
                                    key={s.id}
                                    className={'subject-card' + (s.active ? '' : ' inactive')}
                                >
                                                                        <div className="subject-card-top">
                                        <div className="subject-icon-stack">
                                            <div className="subject-icon-wrap">
                                                <MdBook />
                                            </div>
                                            <span className={'subject-state ' + (s.active ? 'on' : 'off')}>
                                                {s.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="subject-meta">
                                            <h3 className="subject-name">{s.name}</h3>
                                            <p className="subject-desc">{s.description}</p>
                                            <div className="subject-tags">
                                                <span className="tag board">{s.board}</span>
                                                {s.grades.map(g => (
                                                    <span key={g} className="tag grade">G{g}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="subject-actions">
                                        <button
                                            type="button"
                                            className="mini-btn outline"
                                            onClick={() => handleToggleActive(s.id)}
                                        >
                                            {s.active ? <MdLock /> : <MdLockOpen />}
                                            {s.active ? 'Lock' : 'Unlock'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mini-btn ghost"
                                            onClick={() => handleEdit(s.id)}
                                        >
                                            <MdEdit /> Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Subjects