import React, { useRef, useState } from 'react'
import '../SignUp/signup.css'
import '../Login/Login.css'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../actions/auth'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

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
	const initialState = {
		image: '',
		bio: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		ConfirmPassword: '',
		categoryOne: '',
		categoryTwo: '',
	}
	const [formData, setFormData] = useState(initialState)
	const [isNext, setIsNext] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(signup(formData, navigate))
		console.log('signup', formData)
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<div className='loginSignUpContainer'>
			<div className='signCard'>
				<section className='loginContainer'>
					<form onSubmit={handleSubmit}>
						{!isNext ? (
							<>
								<div className='names'>
									<div>
										<label>First Name</label>
										<input name='firstName' required placeholder='First Name' onChange={handleChange} style={{ width: '90%' }} />
									</div>
									<div>
										<label>Last Name</label>
										<input name='lastName' required placeholder='Last Name' onChange={handleChange} />
									</div>
								</div>

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
									<Button onClick={() => setIsNext(!isNext)} buttonStyle={'loginBtn'} buttonSize={'largeBtn'}>
										Next
									</Button>
								</section>
								<div className='SignmsgContainer'>
									<p className='msg'>You're a member? </p>
									<Link className='linkText' to='/login' style={{ textDecoration: 'none' }}>
										Login
									</Link>
								</div>
							</>
						) : (
							<>
								<section>
									<Button onClick={() => setIsNext(!isNext)} buttonStyle={'backBtn'} buttonSize={'mediumBtn'}>
										{`${'<'}`}
									</Button>
								</section>
								<div>
									<label>Bio</label>
									<input name='bio' required placeholder='Bio' onChange={handleChange} />
								</div>
								<FormControl fullWidth margin='normal'>
									<InputLabel id='demo-simple-select-label'>Favorite Category 1:</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={formData.categoryOne}
										label='Category'
										size='small'
										sx={{ margin: 1 }}
										onChange={(e) => {
											setFormData({ ...formData, categoryOne: e.target.value })
										}}
										required
									>
										<MenuItem value={'adventure'} className='menuItems'>
											Adventure
										</MenuItem>
										<MenuItem value={'horror'} className='menuItems'>
											Horror
										</MenuItem>
										<MenuItem value={'humour'} className='menuItems'>
											Humour
										</MenuItem>
										<MenuItem value={'Non-Fiction'} className='menuItems'>
											Non-Fiction
										</MenuItem>
										<MenuItem value={'romance'} className='menuItems'>
											Romance
										</MenuItem>
									</Select>
								</FormControl>

								<FormControl fullWidth margin='normal'>
									<InputLabel id='demo-simple-select-label'>Favorite Category 2:</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={formData.categoryTwo}
										label='Category'
										size='small'
										sx={{ margin: 1 }}
										onChange={(e) => {
											setFormData({ ...formData, categoryTwo: e.target.value })
										}}
										required
									>
										<MenuItem value={'Adventure'} className='menuItems'>
											Adventure
										</MenuItem>
										<MenuItem value={'Horror'} className='menuItems'>
											Horror
										</MenuItem>
										<MenuItem value={'Humour'} className='menuItems'>
											Humour
										</MenuItem>
										<MenuItem value={'Non-Fiction'} className='menuItems'>
											Non-Fiction
										</MenuItem>
										<MenuItem value={'Romance'} className='menuItems'>
											Romance
										</MenuItem>
									</Select>
								</FormControl>
								<section className='signupBtn'>
									<Button type='submit' buttonStyle={'loginBtn'} buttonSize={'largeBtn'}>
										Signup
									</Button>
								</section>
							</>
						)}
					</form>
				</section>
			</div>
		</div>
	)
}

export default SignUp
