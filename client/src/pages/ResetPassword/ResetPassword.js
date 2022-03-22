import React, { useState } from 'react'
import { Button } from '../../components/button/Button'
import { resetPassword } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function ResetPassword(props) {
	const {id: userID} = useParams();
	const dispatch = useDispatch()
	const initialState = { password: '', ConfirmPassword: '', redirect: 'http://localhost:3000/login'}
	const [formData, setFormData] = useState(initialState)

	const state = useSelector(state => {
		return state.authReducer;
	});

	const navigate = useNavigate();

	const {loading, authData, errorss} = state;

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPassword(userID, formData, navigate))
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<div className='loginSignUpContainer'>
			<div className='card'>
				<label>Reset Password</label>
				{errorss && (<Alert severity="error">{errorss}</Alert>)}
				<form onSubmit={handleSubmit}>
					<label>Enter new password</label>
					<input name='password' className='control' placeholder='New Password' type='password' required onChange={handleChange} />
					<p className='errorMsg'></p>

					<label>Confirm new password</label>
					<input
						name='ConfirmPassword'
						className='control'
						placeholder='Confirm Password'
						type='password'
						required
						onChange={handleChange}
					/>
					<p className='errorMsg'></p>
					<section className='submitButton'>
						<Button buttonStyle={'loginBtn'} buttonSize={'largeBtn'} type='submit'>
							Submit
						</Button>
					</section>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword