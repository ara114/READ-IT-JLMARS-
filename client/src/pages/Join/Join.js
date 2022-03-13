import React, { useState, useEffect } from 'react'
import Container from '../../components/container/container'
import { TextField, Button, Typography, Paper, Grow } from '@material-ui/core'
import useStyles from './Joinstyles'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'
import { useSelector } from 'react-redux'
const Create = () => {
	const classes = useStyles()
	const navigate = useNavigate()
	const [code, setCode] = useState('')

	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if(!user) navigate('/')
	}, [])

	const stories = useSelector((state)=> state.stories);
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('room',code)
		var storyy = null;
		var code1 = code.slice(0, 36)
		console.log('stories: ',stories);
		stories.map((story) => {
		  if((story.storyID === code1) && code.length > 36)
			  storyy = story
		})
		console.log('story',storyy);
		if(storyy !== null) 
			navigate(`/Mashup/${code}`, { replace: true })
		else
			navigate(`/Create/${code}`, { replace: true })
	}

	return (
		<Container contentClass={'joinContent'} nav={<NavBar />}>
			{/* {console.log(window.location.pathname)} */}
			<Grow in>
				<Paper className={classes.paper}>
					<form autoComplete='off' className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
						<Typography variant='h6'>Enter Room code:</Typography>
						<TextField
							name='code'
							variant='outlined'
							label='Room code'
							fullWidth
							value={code}
							onChange={(e) => {
								setCode(e.target.value)
							}}
							required
						/>
						<Button
							className={classes.buttonSubmit}
							variant='contained'
							style={{ backgroundColor: '#8e05c2', color: '#fff' }}
							size='large'
							type='submit'
						>
							Join
						</Button>
					</form>
				</Paper>
			</Grow>
		</Container>
	)
}

export default Create
