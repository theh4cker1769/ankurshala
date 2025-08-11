import React, { useEffect, useState } from 'react'

const Header = () => {

    return (
        <header className='header'>
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