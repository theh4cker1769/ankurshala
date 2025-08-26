import { IoMdLogOut } from 'react-icons/io'
import { MdMenu } from 'react-icons/md'

const Header = () => {

    const userProfile = '/assets/images/sidebar/user-profile.png'

    const handleLogout = () => {
        console.log('Logging out...')
    }

    const toggleSidebar = () => {
        document.body.classList.toggle('sidebar-collapsed')
    }

    return (
        <header className='header'>
            <div className="logo">
                <button
                    type="button"
                    className="hamburger-btn"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <MdMenu />
                </button>
            </div>
            <nav className="nav">
                <div className="user-info">
                    <div className="user-avatar">
                        <img src={userProfile} alt="User Profile" />
                    </div>
                    <div className="user-meta">
                        <span className="user-name">John Doe</span>
                        <span className="user-role">Administrator</span>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
                    <IoMdLogOut className="logout-icon" />
                </button>
            </nav>
        </header>
    )
}

export default Header