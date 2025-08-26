import { useState, useMemo } from 'react'
import {
    MdBook,
    MdLock,
    MdLockOpen,
    MdEdit,
    MdCheckCircle,
    MdCancel,
    MdDelete
} from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'

const Subjects = () => {
    // Initial data (unchanged)
    const initialSubjects = [
        { id: 1, name: 'Mathematics', description: 'Core numeracy & problem solving fundamentals.', board: 'CBSE', grades: ['6', '7', '8'], active: true, code: 'MATH' },
        { id: 2, name: 'Physics', description: 'Mechanics, waves & introductory electricity.', board: 'ICSE', grades: ['9', '10'], active: true, code: 'PHYS' },
        { id: 3, name: 'Biology', description: 'Life sciences & human physiology basics.', board: 'CBSE', grades: ['8', '9'], active: false, code: 'BIO' },
        { id: 4, name: 'History', description: 'Ancient to modern eras & civilizations overview.', board: 'State', grades: ['7', '8', '9'], active: true, code: 'HIST' },
        { id: 5, name: 'Chemistry', description: 'Atoms, compounds and reactions essentials.', board: 'ICSE', grades: ['9', '10'], active: true, code: 'CHEM' },
        { id: 6, name: 'Geography', description: 'Physical regions, mapping & climate systems.', board: 'CBSE', grades: ['6', '7'], active: false, code: 'GEO' }
    ]

    // Subjects state
    const [subjects, setSubjects] = useState(initialSubjects)

    // Filter state
    const [boardFilter, setBoardFilter] = useState('all')
    const [gradeFilter, setGradeFilter] = useState('all')
    const [subjectFilter, setSubjectFilter] = useState('all')
    const [search, setSearch] = useState('')

    // Derived lists (from state)
    const boards = useMemo(
        () => Array.from(new Set(subjects.map(s => s.board))).sort(),
        [subjects]
    )
    const grades = useMemo(
        () => Array.from(new Set(subjects.flatMap(s => s.grades))).sort((a, b) => Number(a) - Number(b)),
        [subjects]
    )
    const subjectNames = useMemo(
        () => Array.from(new Set(subjects.map(s => s.name))).sort(),
        [subjects]
    )

    // Counters
    const totalSubjects = subjects.length
    const activeSubjects = subjects.filter(s => s.active).length
    const inactiveSubjects = totalSubjects - activeSubjects
    const educationalBoards = boards.length

    // Filtering
    const filtered = subjects.filter(s => {
        if (boardFilter !== 'all' && s.board !== boardFilter) return false
        if (gradeFilter !== 'all' && !s.grades.includes(gradeFilter)) return false
        if (subjectFilter !== 'all' && s.name !== subjectFilter) return false
        if (search.trim()) {
            const q = search.toLowerCase()
            if (!(s.name.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q) ||
                s.board.toLowerCase().includes(q) ||
                (s.code || '').toLowerCase().includes(q))) return false
        }
        return true
    })

    // Placeholder (unchanged actions)
    const handleToggleActive = id =>
        setSubjects(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
    const handleEdit = id => console.log('Edit later id:', id)

    // ADD SUBJECT MODAL (create only)
    const [createOpen, setCreateOpen] = useState(false)
    const [createForm, setCreateForm] = useState({
        name: '',
        description: '',
        grade: '',
        board: '',
        code: '',
        active: true
    })

    const handleAddSubject = () => {
        setCreateForm({
            name: '',
            description: '',
            grade: '',
            board: boards[0] || '',
            code: '',
            active: true
        })
        setCreateOpen(true)
    }

    const handleCreateChange = e => {
        const { name, value, type, checked } = e.target
        setCreateForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleCreateSubmit = e => {
        e.preventDefault()
        if (!createForm.name.trim() || !createForm.board || !createForm.grade) return
        setSubjects(prev => [
            ...prev,
            {
                id: Date.now(),
                name: createForm.name.trim(),
                description: createForm.description.trim(),
                board: createForm.board,
                grades: [createForm.grade],
                code: createForm.code.trim(),
                active: createForm.active
            }
        ])
        setCreateOpen(false)
    }

    const closeCreate = () => setCreateOpen(false)

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

            <div className="subjects-panel dash-section">

                <div className="subjects-grid">
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
                                        <button
                                            type="button"
                                            className="mini-btn outline danger"
                                            onClick={() => console.log('Delete subject id:', s.id)}
                                        >
                                            <MdDelete /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* CREATE SUBJECT MODAL */}
            {createOpen && (
                <div className="modal-overlay" role="dialog" aria-modal="true">
                    <div className="modal-shell">
                        <div className="modal-head">
                            <h2>Create New Subject</h2>
                            <button
                                type="button"
                                className="icon-close"
                                onClick={closeCreate}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleCreateSubmit}>
                            <div className="form-grid">
                                <div className="m-control">
                                    <label>Subject Name<span>*</span></label>
                                    <input
                                        name="name"
                                        value={createForm.name}
                                        onChange={handleCreateChange}
                                        required
                                        placeholder="e.g. Mathematics"
                                    />
                                </div>
                                <div className="m-control">
                                    <label>Subject Code</label>
                                    <input
                                        name="code"
                                        value={createForm.code}
                                        onChange={handleCreateChange}
                                        placeholder="Short code"
                                    />
                                </div>
                                <div className="m-control">
                                    <label>Grade Level<span>*</span></label>
                                    <select
                                        name="grade"
                                        value={createForm.grade}
                                        onChange={handleCreateChange}
                                        required
                                    >
                                        <option value="">Select grade</option>
                                        {grades.map(g => (
                                            <option key={g} value={g}>Grade {g}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="m-control">
                                    <label>Education Board<span>*</span></label>
                                    <select
                                        name="board"
                                        value={createForm.board}
                                        onChange={handleCreateChange}
                                        required
                                    >
                                        <option value="">Select board</option>
                                        {boards.map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="m-control wide">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        value={createForm.description}
                                        onChange={handleCreateChange}
                                        placeholder="Short description..."
                                    />
                                </div>
                                <div className="m-control switch-cell">
                                    <label>Active Subject</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name="active"
                                            checked={createForm.active}
                                            onChange={handleCreateChange}
                                        />
                                        <span className="slider" />
                                    </label>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn secondary"
                                    onClick={closeCreate}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn primary"
                                    disabled={!createForm.name || !createForm.board || !createForm.grade}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Subjects