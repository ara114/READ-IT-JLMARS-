import React, { useState, useEffect } from 'react'
import Container from '../../components/container/container'
import UserNav from '../../pages/user/UserNav'
import './Account.css'
import FileBase from 'react-file-base64'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/auth';
import { TextField, Button, Typography, Paper, Grow, Grid } from '@material-ui/core'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import useStyles from './styles'

export default function Account() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem('profile'));
	const names = user?.result?.name.split(' ');
	console.log(names);
	const [userData, setUserData] = useState({ image: user?.result?.image, firstName: names[0], lastName: names[1], categoryOne: user?.result?.categoryOne, categoryTwo: user?.result?.categoryTwo, bio: user?.result?.bio });

	const [currentId, setCurrentId] = useState(0);

	

	useEffect(() => {
		setCurrentId(user?.result?._id);
	}, [])
	


	function handleSubmit(event) {
		event.preventDefault()
		dispatch(updateUser(currentId, userData));
		localStorage.setItem('profile', JSON.stringify({ ...user, result: {...user?.result, name: `${userData.firstName} ${userData.lastName}`, bio: userData.bio, categoryOne: userData.categoryOne, categoryTwo: userData.categoryTwo}}));
		navigate('/user');
	}

	return (
		<Container nav={<UserNav />}>
			<Grow in>
				<Paper className={classes.paper}>
				<Typography variant='h4' align='center'><strong>Account Details</strong></Typography>
					<form autoComplete='off' className={`${classes.root} ${classes.form} createForm`} onSubmit={(e) => {handleSubmit(e);}}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									name='name'
									label='First Name'
									variant='outlined'
									value={userData.firstName}
									size='small'
									fullWidth
									onChange={(e) => {
										setUserData({ ...userData, firstName: e.target.value });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='name'
									label='Last Name'
									variant='outlined'
									value={userData.lastName}
									size='small'
									fullWidth
									onChange={(e) => {
										setUserData({ ...userData, lastName: e.target.value });
									}}
								/>
							</Grid>
						</Grid>
						<FormControl fullWidth margin='normal' required>
							<InputLabel id='demo-simple-select-label'>Favorite Category 1:</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={userData.categoryOne}
								label='Category'
								size='small'
								// sx={{ margin: 1 }}
								onChange={(e) => {
									setUserData({ ...userData, categoryOne: e.target.value });
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

						<FormControl fullWidth margin='normal' required>
							<InputLabel id='demo-simple-select-label'>Favorite Category 2:</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={userData.categoryTwo}
								label='Category'
								size='small'
								// sx={{ margin: 1 }}
								onChange={(e) => {
									setUserData({ ...userData, categoryTwo: e.target.value })
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
						<TextField
							name='bio'
							variant='outlined'
							label='Bio'
							fullWidth
							multiline
							rows={10}
							value={userData.bio}
							onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
							required
						/>
						<Button
							className={classes.buttonSubmit}
							variant='contained'
							style={{ backgroundColor: '#8e05c2', color: '#fff' }}
							size='large'
							type='submit'
							fullWidth
						>
							Save Changes
						</Button>
						{/* <Button type='submit' >Save Changes</Button> */}
					</form>
				</Paper>
			</Grow>
			{/* <div className='acc-container'>
				<div className='heading'>
					<h1>Account</h1>
				</div>
				<div className='form-div'>
					<form onSubmit={handleSubmit}>
						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>First Name </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='text' id='name' value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Last Name </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='text' id='name' value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Favorite Category1 </label>
							</aside>
							<div className='inp inp-inp'>
							<select name="favCategoryOne" id="favCategoryOne" value={userData.categoryOne} onChange={(e) => setUserData({ ...userData, categoryOne: e.target.value })}>
								<option value="Adventure">Adventure</option>
								<option value="Humour">Humour</option>
								<option value="Horror">Horror</option>
								<option value="Romance">Romance</option>
								<option value="Non-Fiction">Non-Fiction</option>
							</select>
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Favorite Category2 </label>
							</aside>
							<div className='inp inp-inp'>
								<select name="favCategoryTwo" id="favCategoryTwo" value={userData.categoryTwo} onChange={(e) => setUserData({ ...userData, categoryTwo: e.target.value })}>
									<option value="Adventure">Adventure</option>
									<option value="Humour">Humour</option>
									<option value="Horror">Horror</option>
									<option value="Romance">Romance</option>
									<option value="Non-Fiction">Non-Fiction</option>
								</select>
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='bio'>Bio </label>
							</aside>
							<div className='inp inp-inp'>
								<textarea id='bio' rows='5' value={userData.bio} onChange={(e) => setUserData({ ...userData, bio: e.target.value })}></textarea>
							</div>
						</div>

						<div>
							<button className='save-btn' type='submit' >Save Changes</button>
							
						</div>
					</form>
				</div>
			</div> */}
		</Container>
	)
}
