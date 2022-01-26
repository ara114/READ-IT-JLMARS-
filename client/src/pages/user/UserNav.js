import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './UserNav.css'
function UserNav(){
    	// These states help in closing the shadow box
	const [click, setClick] = useState(false)
	const handleClick = () => setClick(!click)
	const closeMobileMenu = () => setClick(false)

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const [stickyClass, setStickyClass] = useState('')

	useEffect(() => {
		window.addEventListener('scroll', stickNavbar)
		return () => window.removeEventListener('scroll', stickNavbar)
	}, [])

	const stickNavbar = () => {
		if (window !== undefined) {
			let windowHeight = window.scrollY
			// window height changed for the demo
			windowHeight > 0 ? setStickyClass('sticky-nav') : setStickyClass('')
		}
	}

        return (
            <header>
                <nav className={`userNav ${stickyClass}`}>
                    {/* <div className='navbarContainer'> */}
    
                    <Link to='/home' className='userNavLogo' onClick={closeMobileMenu}>
                        {/* This is the logo with the name of the website, which can be found on the left */}
                        <div onClick={scrollToTop}>Readit</div>
                    </Link>
    
                    <div className='icon' onClick={handleClick}>
                        {/* This is the X and Hamburger logo on the right */}
                        <i className={click ? 'fas fa-times' : 'fas fa-cog'} />
                    </div>
                    <ul className={click ? 'menu active' : 'menu'}>
                        <li className='item' onClick={scrollToTop}>
                            {/* These are all the items in the nav bar */}
                            <Link to='/home' className='itemLinks' onClick={closeMobileMenu}>
                                <i className='fas fa-home'></i>
                            </Link>
                        </li>
                        <li className='item'>
                            <Link to='/account' className='itemLinks' onClick={closeMobileMenu}>
                            <i className="fas fa-user-circle"></i>
                            </Link>
                        </li>
                        <li className='item'>
                            <Link to='/security' className='itemLinks' onClick={closeMobileMenu}>
                            Security
                            </Link>
                        </li>
                        <li className='item'>
                            <Link to='/About' className='itemLinks' onClick={closeMobileMenu}>
                            About Us
                            </Link>
                        </li>
                        <li className='item'>
                            <Link to='/Logout' className='itemLinks' onClick={closeMobileMenu}>
                            Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        ) 
}


export default UserNav
