import React from 'react'
import './Login.css'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
function Login(props) {
	return (
		<div className='loginSignUpContainer'>
			<div className='card'>
				<label>Email</label>
				<input className='control' type='text' required placeholder='Email address' />
				<p className='errorMsg'></p>
				<label>Password</label>
				<input className='control' type='password' placeholder='Enter your password' required />
				<p className='errorMsg'></p>
				<section className='loginButton'>
					<Button buttonStyle={'loginBtn'} buttonSize={'largeBtn'} to={{ pathname: '/home' }}>
						Login
					</Button>
				</section>
				<div className='msgContainer'>
					<p className='msg'>Not a member?</p>
					<Link to='/signup' style={{ textDecoration: 'none' }}>
						<Button buttonStyle={'tester'} buttonSize={'LoginsmallBtn'}>
							Signup
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login

// <i class='far fa-envelope'></i>
// <i class='fas fa-lock'></i>
