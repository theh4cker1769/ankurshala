import './App.css'
import Login from './authentication/Login'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './pages/Admin/Dashboard'
import UserManagement from './pages/Admin/UserManagement'
import Subjects from './pages/Admin/Subjects'
import Course from './pages/Admin/Course'
import EditStudentProfile from './pages/Admin/UserManagement/EditStudentProfile'
import EditTeachersProfile from './pages/Admin/UserManagement/EditTeachersProfile'

import StudentDashboard from './pages/Student/Dashboard'
import StudentLayout from './layout/StudentLayout'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Admin Portal */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/user-management/edit-student-profile" element={<EditStudentProfile />} />
        <Route path="/user-management/edit-teacher-profile" element={<EditTeachersProfile />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/courses" element={<Course />} />
      </Route>

      {/* Student Portal */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
