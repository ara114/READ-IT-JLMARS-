import React, { useRef, useState } from 'react'
import '../SignUp/signup.css'
import '../Login/Login.css'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../actions/auth'

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

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initialState = { Nickname: '', email: '', password: '', ConfirmPassword: '' }
	const [formData, setFormData] = useState(initialState)

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(signup(formData, navigate))
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<div className='loginSignUpContainer'>
			{' '}
			<div className='signCard'>
				<section className='loginContainer'>
					<form onSubmit={handleSubmit}>
						<label>Nickname</label>
						<input name='Nickname' className='control' required placeholder='Nickname' onChange={handleChange} />

						<label>Email</label>
						<input name='email' className='control' type='email' required placeholder='Email address' onChange={handleChange} />
						<p className='errorMsg'></p>

						<label>Password</label>
						<input name='password' className='control' placeholder='Password' type='password' required onChange={handleChange} />
						<p className='errorMsg'></p>

						<label>Confirm Password</label>
						<input
							name='ConfirmPassword'
							className='control'
							placeholder='Confirm Password'
							type='password'
							required
							onChange={handleChange}
						/>
						<p className='errorMsg'></p>

						<section className='signupBtn'>
							<Button type='submit' buttonStyle={'loginBtn'} buttonSize={'largeBtn'}>
								Signup
							</Button>
						</section>
						<div className='SignmsgContainer'>
							<p className='msg'>You're a member? </p>
							<Link className='linkText' to='/login' style={{ textDecoration: 'none' }}>
								Login
							</Link>
						</div>
					</form>
				</section>
			</div>
		</div>
	)
}

export default SignUp
