import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import { Avatar } from '@material-ui/core';
function NavBar() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	// These states help in closing the shadow box
	const [click, setClick] = useState(false)
	const handleClick = () => setClick(!click)
	const closeMobileMenu = () => setClick(false)

	useEffect(() => {
	  const token = user?.token;

	  setUser(JSON.parse(localStorage.getItem('profile')));
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

				<Link to='/home' className='navbarLogo' onClick={closeMobileMenu}>
					{/* This is the logo with the name of the website, which can be found on the left */}
					<div onClick={scrollToTop}>Readit</div>
				</Link>

				<div className='menuIcon' onClick={handleClick}>
					{/* This is the X and Hamburger logo on the right */}
					<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
				</div>
				<ul className={click ? 'navMenu active' : 'navMenu'}>
					<li className='navItem' onClick={scrollToTop}>
						{/* These are all the items in the nav bar */}
						<Link to='/home' className='navLinks' onClick={closeMobileMenu}>
							<i className='fas fa-home'></i>
						</Link>
					</li>
					{user?.result ? (
						<li className='navItem'>
							<Link to='/user' className='navLinks' onClick={closeMobileMenu}>
								<Avatar style={{background: '#8e05c2'}} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
							</Link>
							{/* <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> */}
						</li>
					) : (
						<li className='navItem' onClick={scrollToTop}>
							<Link to='/user' className='navLinks' onClick={closeMobileMenu}>
								<i className='fas fa-user-circle'></i>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default NavBar
