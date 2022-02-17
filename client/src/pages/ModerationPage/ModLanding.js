import './ModLanding.css'
import { useState, useEffect } from 'react'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
function ModLanding() {
	const [isMobile, setIsMobile] = useState(true)
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
	}, [])
	window.addEventListener('resize', handleResize)
	return (
		<div className='back'>
			<section className='Modtext'>
				<h1>READ-IT MODERATION</h1>
				<p>This is the Moderation Page. Please login with your provided credentials.</p>
			</section>
			<section className='Buttons'>
				<Link to={'/modlogin'}>
					<Button buttonStyle={'secondaryBtn'} buttonSize={isMobile ? 'largestBtn' : 'largeBtn'}>
						Login
					</Button>
				</Link>
			</section>
		</div>
	)
}

export default ModLanding
