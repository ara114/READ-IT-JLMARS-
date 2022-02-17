import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../../components/navbar/NavBar.css'
function ModNav() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
	// These states help in closing the shadow box
	const [click, setClick] = useState(false)
	const handleClick = () => setClick(!click)
	const closeMobileMenu = () => setClick(false)

	useEffect(() => {
		const token = user?.token

		setUser(JSON.parse(localStorage.getItem('profile')))
	}, [])

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
			<nav className={`navbar ${stickyClass}`}>
				{/* <div className='navbarContainer'> */}

				<Link to='/modhome' className='navbarLogo' onClick={closeMobileMenu}>
					{/* This is the logo with the name of the website, which can be found on the left */}
					<div onClick={scrollToTop}>Moderation</div>
				</Link>

				<div className='menuIcon' onClick={handleClick}>
					{/* This is the X and Hamburger logo on the right */}
					<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
				</div>
				<ul className={click ? 'navMenu active' : 'navMenu'}>
					<li className='navItem' onClick={scrollToTop}>
						{/* These are all the items in the nav bar */}
						<Link to='/modhome' className='navLinks' onClick={closeMobileMenu}>
							<i className='fas fa-home'></i>
						</Link>
					</li>
					<li className='navItem'>
						{/* onClick={logout} */}
						<Link to='/modland' className='navLinks'>
							<i className='fas fa-sign-out-alt'></i>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default ModNav
