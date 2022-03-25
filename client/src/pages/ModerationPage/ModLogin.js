import React, { useRef, useState } from 'react'
import '../Login/Login'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { loginMod } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';

function ModLogin(props) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initialState = { email: '', password: '' }
	const [formData, setFormData] = useState(initialState)

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(loginMod(formData, navigate))
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const state = useSelector(state => {
		return state.authReducer;
	});

	const {loading, authData, moderror} = state;

	return (
		<div className='loginSignUpContainer'>
			<div className='card'>
				{moderror && (<Alert severity="error">{moderror}</Alert>)}
				<label>Email</label>
				<input name='email' className='control' type='text' required placeholder='Email address' onChange={handleChange} />
				<p className='errorMsg'></p>
				<label>Password</label>
				<input name='password' className='control' type='password' placeholder='Enter your password' required onChange={handleChange} />
				<p className='errorMsg'></p>
				<section className='loginButton'>
					<Button buttonStyle={'loginBtn'} buttonSize={'largeBtn'} onClick={handleSubmit}>
						Login
					</Button>
				</section>
				{/* <GoogleLogin
				clientId='351534931705-6vbgo7schhjsfniqlc6qppal9snur04t.apps.googleusercontent.com'
				onSuccess={googleSuccess}
				onFailure={googleFailure}
				cookiePolicy='single_host_origin'/> */}
			</div>
		</div>
	)
}

export default ModLogin

// <i class='far fa-envelope'></i>
// <i class='fas fa-lock'></i>
