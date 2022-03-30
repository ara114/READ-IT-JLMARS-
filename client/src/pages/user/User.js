import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getStories } from '../../actions/stories'
import Container from '../../components/container/container'
import UserNav from '../user/UserNav'
import { Avatar } from '@material-ui/core'
import LikedCarousel from '../../components/LikedCarousel/LikedCarousel'
import YourStoriesCarousel from '../../components/YourStoriesCarousel/YourStoriesCarousel'
import './User.css'
import FileBase from 'react-file-base64'
import { updateUser } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'
// import '../../components/Categories/Categories.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@material-ui/core';

import { Link } from 'react-router-dom'

function User() {
	const navigate = useNavigate()
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
	const names = user?.result?.name.split(' ')
	console.log(names)
	const [open, setOpen] = useState(false);
	const [userData, setUserData] = useState({
		image: '',
		firstName: names[0],
		lastName: names[1],
		categoryOne: user?.result?.categoryOne,
		categoryTwo: user?.result?.categoryTwo,
		bio: user?.result?.bio,
	})
	// const [isEdit, setIsEdit] = useState(false)
	const [currentId, setCurrentId] = useState(0)
	useEffect(() => {
		const token = user?.token

		setUser(JSON.parse(localStorage.getItem('profile')))
	}, [])

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories())
	}, [dispatch])

	const handleClose = (event) => {
		setOpen(false);
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<Container nav={<UserNav user={user} setUser={setUser} setCurrentId={setCurrentId} />} contentClass='contentUser'>
			<div className='gridCont'>
					<>
						<div className='gridCont11'>
							<div className='avatar_wrap'>
								<Avatar className='avatar'
									style={{ height: '150px', width: '150px' }}
									alt={user?.result.name}
									src={user?.result.image}
									onClick={() => setOpen(true)}
								>
									{user?.result.name.charAt(0)}
								</Avatar>
								<p className='avatar_description' onClick={() => setOpen(true)}>Change Picture</p>
							</div>
						</div>
						<div className='gridCont12'>
							<div className='userName'> {user?.result.name}</div>
							<div className='bio'>
								<p className='biograph'>{user?.result.bio}</p>
							</div>
								<div className='userFavoriteBtns'>
								<p className='favCat'>Favorite Categories:</p>
									<Link to={`/category/${user?.result?.categoryOne}`} className='userCatBtns' onClick={scrollToTop}>
										{user?.result?.categoryOne}
									</Link>
									<Link to={`/category/${user?.result?.categoryTwo}`} className='userCatBtns' onClick={scrollToTop}>
										{user?.result?.categoryTwo}
									</Link>
						</div>
						</div>

						{/* <div className='user-container2'></div> */}
					</>
			</div>
			<div className='yourStories'>
				<label>Your Stories</label>
				<YourStoriesCarousel user={user?.result} />
			</div>
			<div className='likedStories'>
				<label>Your Liked Stories</label>
				<LikedCarousel user={user?.result} />
			</div>
			<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
			{"Upload profile picture"}
			</DialogTitle>
			<DialogContent>
			<DialogContentText id="alert-dialog-description">
				<FileBase type='file' multiple={false} onDone={({ base64 }) => setUserData({ ...userData, image: base64 })} required />
			</DialogContentText>
			</DialogContent>
			<DialogActions>
			<Button onClick={() => {handleClose(); 	
			localStorage.setItem('profile', JSON.stringify({ ...user, result: { ...user?.result, image: userData.image } }))
			dispatch(updateUser(user?.result?._id, { ...userData, name: user?.result?.name }))
			setOpen(false)
			navigate('/home')}}
			autoFocus
			style={{ color: '#8e05c2' }}>Upload</Button>
			</DialogActions>
		</Dialog>
		</Container>
	)
}

export default User
