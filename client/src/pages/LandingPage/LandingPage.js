import './LandingPage.css'
import { useState, useEffect } from 'react'
import { Button } from '../../components/button/Button'
import { Link, useNavigate } from 'react-router-dom'
function LandingPage() {
	const [isMobile, setIsMobile] = useState(true)
	const user = JSON.parse(localStorage.getItem('profile'));
	const navigate = useNavigate();
	//choose the screen size
	const handleResize = () => {
		if (window.innerWidth <= 1200) {
			setIsMobile(false)
		} else {
			setIsMobile(true)
		}
	}
	// create an event listener
	useEffect(() => {
		handleResize()
		if(user) navigate('/home')
	}, [])
	window.addEventListener('resize', handleResize)
	return (
		<div className='back'>
			<section className='text'>
				<h1>READ-IT</h1>
				<p>Write and read various stories, ideas, and explore the imaginations of many others.</p>
			</section>
			<section className='Buttons'>
				<Link to={'/login'}>
					<Button buttonStyle={'secondaryBtn'} buttonSize={isMobile ? 'largestBtn' : 'largeBtn'}>
						Login
					</Button>
				</Link>
				<Link to={'/signup'}>
					<Button buttonSize={isMobile ? 'largestBtn' : 'largeBtn'}>Sign Up</Button>
				</Link>
			</section>
			<section className="toModerator">
				<Link to={'/modlogin'}>
					<p>Login as Moderator</p>
				</Link>
			</section>
		</div>
	)
}

export default LandingPage
