import React, { useState } from 'react'
import '../ForgotPassword/ForgotPass.css'
import { Button } from '../../components/button/Button'
import { forgotPassword } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'

function ForgotPassword(props) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initialState = { email: '', redirect: 'https://readit-netlify.netlify.app/reset'}
	const [formData, setFormData] = useState(initialState)

	const state = useSelector(state => {
		return state.authReducer;
	});

	const {loading, authData, error} = state;

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(forgotPassword(formData))
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<div className='loginSignUpContainer'>
			<div id="forgotBox" className='card'>
				<form onSubmit={handleSubmit}>
					<section>
						<Button onClick={() => navigate('/login')} buttonStyle={'backBtnF'} buttonSize={'mediumBtn'}>
							{`${'<'}`}
						</Button>
				{error && (<Alert id="errorMsg1" severity="error">{error}</Alert>)}
				{authData && (<Alert id="errorMsg1" severity="success">{authData.message}</Alert>)}
					</section>
					<label id="labelEnter">Enter your email address</label>
					<input name='email' className='control' type='text' required placeholder='Email address' onChange={handleChange} />
					<section  id="forgotBtn" className='submitButton'>
						<Button buttonStyle={'loginBtn'} buttonSize={'largeBtn'} type='submit'>
							Submit
						</Button>
					</section>
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword