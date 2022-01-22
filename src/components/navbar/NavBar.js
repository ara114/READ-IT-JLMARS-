import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
function NavBar() {
	// These states help in closing the shadow box
	const [click, setClick] = useState(false)
	const handleClick = () => setClick(!click)
	const scrollToTop = () => {
		window.scrollTo({
		  top: 0,
		  behavior: "smooth"
		});
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
			<nav className={`navbar ${stickyClass}`}>
				{/* <div className='navbarContainer'> */}
				{/* <Link to='/home' className='navbarLogo' onClick={closeMobileMenu}> */}
				<Link to='/home' className='navbarLogo'  onClick={scrollToTop}>
					{/* This is the logo with the name of the website, which can be found on the left */}
					Readit
				</Link>
				<ul className='navMenu'>
					<li className='navItem'>
						{/* These are all the items in the nav bar */}
						{/* <Link to='/home' className='navLinks' onClick={closeMobileMenu}> */}
						<Link to='/home' className='navLinks' onClick={scrollToTop}>
							<i className='fas fa-home'></i>
						</Link>
					</li>
					<li className='navItem'>
						{/* <Link to='/user' className='navLinks' onClick={closeMobileMenu}> */}
						<Link to='/user' className='navLinks'>
							<i className='fas fa-user-circle'></i>
						</Link>
					</li>
				</ul>
				{/* </div> */}
			</nav>
		</header>
	)
}

export default NavBar
