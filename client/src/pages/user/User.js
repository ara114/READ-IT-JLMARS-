import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {getStories} from '../../actions/stories';
import Container from '../../components/container/container'
import UserNav from '../user/UserNav'
import { Avatar } from '@material-ui/core';
import CarouselUser from '../../components/carouselUser/CarouselUser'
import './User.css'
import FileBase from 'react-file-base64'
import { updateUser } from '../../actions/auth';
import {useNavigate} from 'react-router-dom'

function User() {
	const navigate = useNavigate();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const names = user?.result?.name.split(' ');
	console.log(names);
	const [userData, setUserData] = useState({ image: '', firstName: names[0], lastName: names[1], categoryOne: user?.result?.categoryOne, categoryTwo: user?.result?.categoryTwo, bio: user?.result?.bio });
	const [isEdit, setIsEdit] = useState(false);
	const [currentId, setCurrentId] = useState(0);
	useEffect(() => {
		const token = user?.token;
  
		setUser(JSON.parse(localStorage.getItem('profile')));
	  }, [])

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	
	return (
		<Container nav={<UserNav user={user} setUser={setUser} setCurrentId={setCurrentId}/>}>
			<div className="user-container1">
				{isEdit ?
					<div className="editProfilePic">
						<FileBase type='file' multiple={false} onDone={({ base64 }) => setUserData({...userData, image: base64})} required />
						<button onClick={() => {localStorage.setItem('profile', JSON.stringify({ ...user, result: {...user?.result, image: userData.image}})); dispatch(updateUser(user?.result?._id, { ...userData, name: user?.result?.name })); setIsEdit(false); navigate('/user');}}>Upload</button>
					</div>
				:
				(<>
					<div>
					<Avatar style={{ height: '100px', width: '100px' , background: '#8e05c2'}} alt={user?.result.name} src={user?.result.image}>{user?.result.name.charAt(0)}</Avatar>
					<button onClick = {() => setIsEdit(true)}>Edit</button>
					</div>
					
					<div className="user-container2">
						{user?.result.name}
						<div className="bio">Bio: {user?.result?.bio}</div>
						<div className="favCategories">Favorite Categories: {user?.result?.categoryOne} {user?.result?.categoryTwo}</div>
					</div>
				</>)}
			</div>
			<div className="likedStories">
				<label>Liked Stories</label> 
				<CarouselUser/>
			</div>
		</Container>
	)
}

export default User
