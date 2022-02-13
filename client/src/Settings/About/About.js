import React from 'react'
import Container from '../../components/container/container'
import UserNav from '../../pages/user/UserNav'
import './About.css'

export default function About() {
	return (
		<Container nav={<UserNav />}>
			<div className='abt-container'>
				<div className='bg-img'>
					<div className='page-title'>
						<h1>About Us</h1>
					</div>
				</div>
				<div className='content-setting'>
					<p>
						Our mission is to help our customers bring their visions to reality, be it anything from an online multiplayer web game to a
						real-time collaborative platform. We help you achieve value in your ideas, assisting you in every part of the way to determine
						the most proper solution to your problems.
					</p>
					<br></br>
					<p>
						Our specialists develop Web Applications that are compatible with all modern platforms such as Chrome, Safari, iOS and
						Android. We develop our applications using React, HTML, CSS, JavaScript, etc. We utilise tools like Node.js, MongoDB,
						Firebase, Sockets.io and others for the backend. We prioritise providing adequate safety and quality assurance to all our
						products by default.
					</p>
				</div>
			</div>
		</Container>
	)
}
