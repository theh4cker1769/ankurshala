import './App.css'
import Login from './authentication/Login'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import Subjects from './pages/Subjects'
import Course from './pages/Course'
import EditStudentProfile from './pages/UserManagement/EditStudentProfile'
import EditTeachersProfile from './pages/UserManagement/EditTeachersProfile'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/user-management/edit-student-profile" element={<EditStudentProfile />} />
        <Route path="/user-management/edit-teacher-profile" element={<EditTeachersProfile />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/courses" element={<Course />} />
      </Route>
    </Routes>
  )
}

export default App
