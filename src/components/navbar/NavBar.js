import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
function NavBar() {
	// These states help in closing the shadow box
	const [click, setClick] = useState(false)
	const handleClick = () => setClick(!click)
	const closeMobileMenu = () => setClick(false)

	return (
		<header>
			<nav className='navbar'>
				<div className='navbarContainer'>
					<Link to='/' className='navbarLogo' onClick={closeMobileMenu}>
						{/* This is the logo with the name of the website, which can be found on the left */}
						Readit
					</Link>

					<div className='menuIcon' onClick={handleClick}>
						{/* This is the X and Hamburger logo on the right */}
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>
					{/* This helps to open a shadow box with the nav bar when its a phone or a small display. */}
					<ul className={click ? 'navMenu active' : 'navMenu'}>
						<li className={'navItem'}>
							{/* These are all the items in the nav bar */}
							<Link to='/' className='navLinks' onClick={closeMobileMenu}>
								<i class="fas fa-home"></i>
							</Link>
						</li>
						<li className={'navItem'}>
							<Link to='/user' className='navLinks' onClick={closeMobileMenu}>
								<i class="fas fa-user-circle"></i>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	)
}

export default NavBar