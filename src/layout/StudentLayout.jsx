import { Outlet } from 'react-router-dom'
import Header from './Header'
import StudentSidebar from './StudentSidebar'

function App() {

    return (
        <div className="app-shell">
            <StudentSidebar />
            <main>
                <Header />
                <div className="main-content">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default App