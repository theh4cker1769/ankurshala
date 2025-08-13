import { IoMdLogOut } from 'react-icons/io'

const Header = () => {

    // images
  const userProfile = '/assets/images/sidebar/user-profile.png'

    const handleLogout = () => {
        console.log('Logging out...')
    }

    return (
        <header className='header'>
            <div className="logo">
                <h1>Ankurshala</h1>
            </div>
            <nav className="nav">
                <div className="user-info">
                    <div className="user-avatar">
                        <img src={userProfile} alt="User P</g>rofile" />
                    </div>
                    <div className="user-meta">
                        <span className="user-name">John Doe</span>
                        <span className="user-role">Administrator</span>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <IoMdLogOut className="logout-icon" />
                </button>
            </nav>
        </header>
    )
}

export default Header