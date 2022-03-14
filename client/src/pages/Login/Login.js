import React, { useRef, useState } from 'react'
import './Login.css'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { login } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { GoogleLogin } from 'react-google-login'

function Login(props) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initialState = { email: '', password: '' }
	const [formData, setFormData] = useState(initialState)

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(login(formData, navigate))
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const googleSuccess = async (res) => {
		const result = res?.profileObj; 
		const token = res?.tokenId;

		try {
			dispatch({type: 'AUTH', data: {result, token}});
			navigate('/home');
		} catch(error) {
			console.log(error);
		}
	}

	const googleFailure = (error) => {
		console.log(error);

	}

	return (
		<div className='loginSignUpContainer'>
			<div className='card'>
				<form onSubmit={handleSubmit}>
					<label>Email</label>
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
					{/* <GoogleLogin 
					clientId='351534931705-6vbgo7schhjsfniqlc6qppal9snur04t.apps.googleusercontent.com'
					onSuccess={googleSuccess}
					onFailure={googleFailure}
					cookiePolicy='single_host_origin'/> */}
					<div className='msgContainer'>
						<p className='msg'>Not a member?</p>
						<Link className='linkText' to='/signup' style={{ textDecoration: 'none', className: 'color' }}>
							Signup
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login

// <i class='far fa-envelope'></i>
// <i class='fas fa-lock'></i>
