import React from 'react'
import { Link } from 'react-router-dom'
import './Settings.css'

const Navbar = () => {
	return (
		<nav className='navbar-setting border'>
			<h3 className='SETTINGS'>Settings</h3>
			<ul className='nav-links-setting border'>
				<Link to='/account' className='account'>
					<li>Account</li>
				</Link>
				<Link to='/security' className='security'>
					<li>Security</li>
				</Link>
				<Link to='/about' className='about'>
					<li>About</li>
				</Link>
				<Link to='/' className='logout'>
					<li>Logout</li>
				</Link>
			</ul>
		</nav>
	)
}

export default Navbar
