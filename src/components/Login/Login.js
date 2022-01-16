import React from 'react'
import '../Login/Login.css'
import { Button } from '../button/Button'

import Background from '../backgroundImg/Background'
function Login(props) {
	const { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError } = props

	return (
		<Background>
			<div className='card'>
				<section className='loginContainer'>
					<label>Email</label>
					<input
						className='control'
						type='text'
						autoFocus
						required
						placeholder='Email address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<p className='errorMsg'>{emailError}</p>
					<label htmlFor='Password'>Password</label>
					<input
						className='control'
						type='password'
						placeholder='Enter your password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p className='errorMsg'>{passwordError}</p>
					<section className='buttonsContainer'>
						<Button buttonStyle={'loginBtn'} buttonSize={'largeBtn'} onClick={handleLogin}>
							Login
						</Button>
						<p className='msg'>Don't have an account ? </p>
						<Button onClick={() => setHasAccount(!hasAccount)} buttonStyle={'loginBtn'} buttonSize={'LoginsmallBtn'}>
							Sign Up
						</Button>
					</section>
				</section>
			</div>
		</Background>
	)
}

export default Login

// <i class='far fa-envelope'></i>
// <i class='fas fa-lock'></i>
