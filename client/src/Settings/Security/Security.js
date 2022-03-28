import React, { useState, useEffect } from 'react'
import Container from '../../components/container/container'
import UserNav from '../../pages/user/UserNav'
import './Security.css'
import { TextField, Button, Typography, Paper, Grow, Grid } from '@material-ui/core'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import useStyles from '../styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../actions/auth'
import Alert from '@mui/material/Alert';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
  })(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
	  duration: theme.transitions.duration.shortest,
	}),
  }));
  
export default function Security() {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(true);
	const [expanded1, setExpanded1] = useState(false);
	const initialState = { oldPassword: '', password: '', ConfirmPassword: ''}
	const [formData, setFormData] = useState(initialState)
	const user = JSON.parse(localStorage.getItem('profile'));
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleExpandClick1 = () => {
		setExpanded1(!expanded1);
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		dispatch(updatePassword(user?.result?._id, formData, navigate))
	}

	const state = useSelector(state => {
		return state.authReducer;
	});

	const {loading, authData, errorsss} = state;

	
	return (
		<Container nav={<UserNav />}>
			<Grow in>
				<Paper className={classes.paper1}>
					<Typography variant='h4' align='center'><strong>Settings</strong></Typography>
					<Card className={classes.card} elevation={2}>
						<CardActions onClick={handleExpandClick}>
							<Typography variant="h5">
								Change Password
							</Typography>
							<ExpandMore
								expand={expanded}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more"
								>
								<ExpandMoreIcon />
							</ExpandMore>
						</CardActions>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<form autoComplete='off' className={`${classes.root} ${classes.form} createForm`} onSubmit={(e) => {handleSubmit(e);}}>
									{errorsss && (<Alert id="errorMsg" severity="error">{errorsss}</Alert>)}
									<TextField
										name='oldPassword'
										label='Old Password'
										variant='outlined'
										value={formData.oldPassword}
										size='small'
										type='password'
										fullWidth
										required
										onChange={(e) => {
											setFormData({ ...formData, oldPassword: e.target.value });
										}}
									/>
									<TextField
										name='password'
										label='New Password'
										variant='outlined'
										value={formData.password}
										size='small'
										type='password'
										fullWidth
										required
										onChange={(e) => {
											setFormData({ ...formData, password: e.target.value });
										}}
									/>
									<TextField
										name='ConfirmPassword'
										label='Confirm Password'
										variant='outlined'
										value={formData.ConfirmPassword}
										size='small'
										type='password'
										fullWidth
										required
										onChange={(e) => {
											setFormData({ ...formData, ConfirmPassword: e.target.value });
										}}
									/>
									<Button
										className={classes.buttonSubmit}
										variant='contained'
										style={{ backgroundColor: '#8e05c2', color: '#fff' }}
										size='large'
										type='submit'
										fullWidth
									>
										Confirm
									</Button>
								</form>
							</CardContent>
						</Collapse>
					</Card>
					<Card className={classes.card} elevation={2}>
						<CardActions onClick={handleExpandClick1}>
							<Typography variant="h5">
								Delete account
							</Typography>
							<ExpandMore
								expand={expanded1}
								onClick={handleExpandClick1}
								aria-expanded={expanded1}
								aria-label="show more"
								>
								<ExpandMoreIcon />
							</ExpandMore>
						</CardActions>
						<Collapse in={expanded1} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography paragraph>This action will be permanent. Do you wish to continue?</Typography>
								<Button
										className={classes.buttonSubmit}
										variant='contained'
										style={{ backgroundColor: '#8e05c2', color: '#fff' }}
										size='large'
										fullWidth
									>
										Yes
								</Button>
							</CardContent>
						</Collapse>
					</Card>
				</Paper>
			</Grow>
			{/* <div className='sec-container'>
				<div className='SecTitle'>
					<h1>Settings</h1>
				</div>
				<div className='form-div'>
					<form>
						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='old-pw'>Old password </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='password' id='old-pw' />
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='new-pw'>New password </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='password' id='new-pw' />
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='confirm-pw'>Confirm password </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='password' id='confirm-pw' />
							</div>
						</div>

						<div>
							<button className='save-btn'>Save Password</button>
						</div>
					</form>
				</div>
			</div> */}
		</Container>
	)
}
