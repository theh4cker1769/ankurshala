import './App.css'
import Login from './authentication/Login'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import Subjects from './pages/Subjects'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/subjects" element={<Subjects />} />
      </Route>
    </Routes>
  )
}

export default App
