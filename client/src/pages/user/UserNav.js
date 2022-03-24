import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './UserNav.css'
import {useDispatch} from 'react-redux'
import { Avatar } from '@material-ui/core';

function UserNav({setUser, setCurrentId}) {
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
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));

	const logout = () => {
		setUser(null);
		dispatch({type: 'LOGOUT'});
	}

	return (
		<header>
			{/* <div className='tttttt'> */}
			<nav className='userNav'>
				{/* <div className='navbarContainer'> */}

				<Link to='/home' className='navbarLogo' onClick={closeMobileMenu}>
					{/* This is the logo with the name of the website, which can be found on the left */}
					<div onClick={scrollToTop}>Readit</div>
				</Link>

				<div className='icon' onClick={handleClick}>
					{/* This is the X and Hamburger logo on the right */}
					<i className={click ? 'fas fa-times' : 'fas fa-cog'} />
				</div>
				<ul className={click ? 'menu active' : 'menu'}>
				{user?.result ? (
						<li className='itemNav' onClick={scrollToTop} >
							<Link to='/user' className='itemLinks' onClick={closeMobileMenu}>
								<Avatar className='navAvatar' style={{background: '#8e05c2'}} alt={user?.result.name} src={user?.result.image}>{user?.result.name.charAt(0)}</Avatar>
							</Link>
							{/* <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> */}
						</li>
					) : (
						<li className='itemNav' onClick={scrollToTop}>
							<Link to='/user' className='itemLinks' onClick={closeMobileMenu}>
								<i className='fas fa-user-circle'></i>
							</Link>
						</li>
					)}
					<li className='itemNav'>
						<Link to={`/user/${user?.result?._id}`} className='itemLinks' onClick={() => setCurrentId(user?.result?._id)}>
						<h1 className='home-txt'> Edit </h1>
						</Link>
					</li>
					<li className='itemNav'>
						<Link to='/security' className='itemLinks' onClick={closeMobileMenu}>
						<h1 className='home-txt'> Security</h1>
						</Link>
					</li>
					<li className='itemNav'>
						<Link to='/About' className='itemLinks' onClick={closeMobileMenu}>
						<h1 className='home-txt'> About Us</h1>
						</Link>
					</li>
					<li className='itemNav'>
						<Link to='/' className='itemLinks' onClick={logout}>
						<h1 className='home-txt'> Logout</h1>
						</Link>
					</li>
				</ul>
			</nav>
			{/* </div> */}
		</header>
	)
}

export default UserNav