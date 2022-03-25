import React, { useState } from 'react'
import '../SignUp/signup.css'
import '../Login/Login.css'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../actions/auth'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert';

function SignUp() {

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
	const [selected, setSelected] = useState('')
	let categoriesChosen = null;
	let type = null;
	const categories1 = ['Horror', 'Humour', 'Non-Fiction', 'Romance']
	const categories2 = ['Adventure', 'Humour', 'Non-Fiction', 'Romance']
	const categories3 = ['Adventure', 'Horror', 'Non-Fiction', 'Romance']
	const categories4 = ['Adventure', 'Horror', 'Humour', 'Romance']
	const categories5 = ['Adventure', 'Horror', 'Humour', 'Non-Fiction']

	const changeSelectOptionHandler = (event) => {
		setSelected(event.target.value);
	};

	if(selected === 'Adventure')
		type = categories1
	if(selected === 'Horror')
		type = categories2
	if(selected === 'Humour')
		type = categories3
	if(selected === 'Non-Fiction')
		type = categories4
	if(selected === 'Romance')
		type = categories5

	if(type)
		categoriesChosen = type.map((category) => <MenuItem value={`${category}`} key={category} className='menuItems'>{category}</MenuItem>)

	const state = useSelector(state => {
		return state.authReducer;
	});

	const {loading, authData, errors} = state;

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(signup(formData, navigate))
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<div className='loginSignUpContainer'>
			<div className='signCard'>
				<section className='loginContainer'>
				<label id='cardTitle'>Sign Up</label>
					<form id='pushdown' onSubmit={handleSubmit}>
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
											setFormData({ ...formData, categoryOne: e.target.value });
											changeSelectOptionHandler(e)
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
										{categoriesChosen}
									</Select>
								</FormControl>
								{errors && (<Alert severity="error">{errors}</Alert>)}
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
