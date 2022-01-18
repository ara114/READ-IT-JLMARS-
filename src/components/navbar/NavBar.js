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
					<Link to='/home' className='navbarLogo' onClick={closeMobileMenu}>
						{/* This is the logo with the name of the website, which can be found on the left */}
						Readit
					</Link>
					<ul className='navMenu'>
						<li className='navItem'>
							{/* These are all the items in the nav bar */}
							<Link to='/home' className='navLinks' onClick={closeMobileMenu}>
								<i class="fas fa-home"></i>
							</Link>
						</li>
						<li className='navItem'>
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