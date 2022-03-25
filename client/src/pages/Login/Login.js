import React, { useState } from 'react'
import './Login.css'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { login } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';

function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initialState = { email: '', password: '' }
	const [formData, setFormData] = useState(initialState)

	const state = useSelector(state => {
		return state.authReducer;
	});

	const {loading, authData, error} = state;

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(login(formData, navigate))
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<div className='loginSignUpContainer'>
			<div className='card'>
				<label id='cardTitle'>Login</label>
				<form onSubmit={handleSubmit}>
					{error && (<Alert severity="error">{error}</Alert>)}
					<div id='pushdown'>
					<label id='emailLabel'>Email</label>
					<input name='email' className='control' type='text' required placeholder='Email address' onChange={handleChange} />
					<p className='errorMsg'></p>
					<label>Password</label>
					<input name='password' className='control' type='password' placeholder='Enter your password' required onChange={handleChange} />
					<p className='errorMsg'></p>
					<section className='loginButton'>
						<Button buttonStyle={'loginBtn'} buttonSize={'largeBtn'} type='submit'>
							Login
						</Button>
					</section>
					<div className='msgContainer'>
						<Link className='linkText' to='/forgotPassword' style={{ textDecoration: 'none', className: 'color' }}>
							Forgot Password?
						</Link>
					</div>
					<div className='msgContainer'>
						<p className='msg'>Not a member?</p>
						<Link className='linkText' to='/signup' style={{ textDecoration: 'none', className: 'color' }}>
							Signup
						</Link>
					</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login

// <i class='far fa-envelope'></i>
// <i class='fas fa-lock'></i>
