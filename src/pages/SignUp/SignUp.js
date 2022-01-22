import React, { useRef, useState } from 'react'
import '../Login/Login'
import { useAuth } from '../../contexts/AuthContext'
import Background from '../../components/backgroundImg/Background'
import { Button } from '../../components/button/Button'
function SignUp() {
	// const emailRef = useRef();
	// const passwordRef = useRef();
	// const passwordConfirmRef = useRef();
	// const {signup} = useAuth()
	// const [error, setError] = useState('');
	// const [loading, setLoading] = useState(false);

	// async function handleSubmit(e) {
	// 	e.preventDefault();

	// 	if(passwordRef.current.value !== passwordConfirmRef.current.value) {
	// 		return setError('passwords dont match')
	// 	}
	// 	try{
	// 		setError('')
	// 		setLoading(true)
	// 		await signup(emailRef.current.value, passwordRef.current.value);
	// 	} catch{
	// 		setError('Failed to create an account')
	// 	}
	// 	setLoading(false)
	// }
	return (
		<Background>
			<div className='card'>
				<section className='loginContainer'>
					<form>
						<label>Email</label>
						<input className='control' type='email' required placeholder='Email address' />
						<p className='errorMsg'></p>

						<label>Password</label>
						<input className='control' placeholder='Password' type='password' required />
						<p className='errorMsg'></p>
						<label>Confirm Password</label>
						<input className='control' placeholder='Confirm Password' type='password' required />
						<p className='errorMsg'></p>
						<section className='buttonsContainer'>
							<Button type='submit' buttonStyle={'loginBtn'} buttonSize={'largeBtn'}>
								Signup
							</Button>
							<div className='msgContainer'>
								<p className='msg'>Do you have an account?</p>
								<Button buttonStyle={'loginBtn'} buttonSize={'LoginsmallBtn'}>
									Login
								</Button>
							</div>
						</section>
					</form>
				</section>
			</div>
		</Background>
	)
}

export default SignUp
