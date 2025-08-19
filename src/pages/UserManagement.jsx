//// filepath: c:\My Laptop\Projects\Ankurshala\app\src\pages\UserManagement.jsx
import { useState } from 'react'
import { MdPeople, MdPerson, MdCheckCircle, MdCancel } from 'react-icons/md'
import { FaUserGraduate } from 'react-icons/fa'

const UserManagement = () => {
    // Tabs
    const [tab, setTab] = useState('students')

    // Sample data (replace later with API)
    const students = [
        { id: 1, name: 'Aditi Sharma', grade: 'Grade 8', className: '8B', active: true },
        { id: 2, name: 'Rahul Verma', grade: 'Grade 7', className: '7A', active: true },
        { id: 3, name: 'Meera Iyer', grade: 'Grade 9', className: '9C', active: false },
        { id: 4, name: 'Arjun Rao', grade: 'Grade 10', className: '10A', active: true },
    ]

    const teachers = [
        { id: 1, name: 'Mr. Rao', subject: 'Physics', grade: '8–10', active: true },
        { id: 2, name: 'Ms. Kapoor', subject: 'Mathematics', grade: '7–9', active: true },
        { id: 3, name: 'Mrs. Singh', subject: 'Biology', grade: '9–10', active: false },
    ]

    const handleActivateToggle = (type, id) => {
        console.log((type === 'student' ? 'Student' : 'Teacher') + ' toggle id:', id)
    }
    const handleViewProfile = (type, id) => {
        console.log('View profile', type, id)
    }

    const renderStudents = () => (
        <div className="entity-grid">
            {students.map(s => (
                <div key={s.id} className={'entity-card' + (!s.active ? ' inactive' : '')}>
                    <div className="entity-main">
                        <div className="entity-avatar student">
                            <FaUserGraduate />
                        </div>
                        <div className="entity-meta">
                            <span className="entity-name">{s.name}</span>
                            <span className="entity-sub">{s.grade} • Class {s.className}</span>
                            <span className={'entity-status ' + (s.active ? 'on' : 'off')}>
                                {s.active ? <MdCheckCircle /> : <MdCancel />} {s.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                    <div className="entity-actions">
                        <button
                            className={'mini-btn ' + (s.active ? 'outline' : 'primary')}
                            type="button"
                            onClick={() => handleActivateToggle('student', s.id)}
                        >
                            {s.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                            className="mini-btn ghost"
                            type="button"
                            onClick={() => handleViewProfile('student', s.id)}
                        >
                            View Profile
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )

    const renderTeachers = () => (
        <div className="entity-grid">
            {teachers.map(t => (
                <div key={t.id} className={'entity-card' + (!t.active ? ' inactive' : '')}>
                    <div className="entity-main">
                        <div className="entity-avatar teacher">
                            <MdPerson />
                        </div>
                        <div className="entity-meta">
                            <span className="entity-name">{t.name}</span>
                            <span className="entity-sub">{t.subject} • Grades {t.grade}</span>
                            <span className={'entity-status ' + (t.active ? 'on' : 'off')}>
                                {t.active ? <MdCheckCircle /> : <MdCancel />} {t.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                    <div className="entity-actions">
                        <button
                            className={'mini-btn ' + (t.active ? 'outline' : 'primary')}
                            type="button"
                            onClick={() => handleActivateToggle('teacher', t.id)}
                        >
                            {t.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                            className="mini-btn ghost"
                            type="button"
                            onClick={() => handleViewProfile('teacher', t.id)}
                        >
                            View Profile
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <section className="user-management">
            {/* Top section (hero-style) */}
            <div className="um-hero">
                <div className="um-badge">
                    <MdPeople /> User Management
                </div>
                <h1 className="um-title">Manage Students & Teachers</h1>
                <p className="um-sub">Add, review, activate or view profiles across the platform.</p>
            </div>

            {/* Tabs + content */}
            <div className="um-body">
                <div className="um-panel dash-section um-panel--with-tabs">
                    <div className="um-tabs in-panel">
                        <button
                            type="button"
                            className={'um-tab' + (tab === 'students' ? ' active' : '')}
                            onClick={() => setTab('students')}
                        >
                            Students
                        </button>
                        <button
                            type="button"
                            className={'um-tab' + (tab === 'teachers' ? ' active' : '')}
                            onClick={() => setTab('teachers')}
                        >
                            Teachers
                        </button>
                    </div>

                    <div className="panel-head">
                        <h2>{tab === 'students' ? 'Students' : 'Teachers'}</h2>
                        <span className="panel-count">
                            {tab === 'students' ? students.length : teachers.length} total
                        </span>
                    </div>
                    {tab === 'students' ? renderStudents() : renderTeachers()}
                </div>
            </div>
        </section>
    )
}

export default UserManagement