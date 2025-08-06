import React, { useEffect, useState } from 'react'

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header${scrolled ? ' scrolled' : ''}`}>
            <div className="logo">
                <h1>Ankurshala</h1>
            </div>
            <nav className="nav">
                <button className="btn primary">Join Now</button>
            </nav>
        </header>
    )
}

export default Header