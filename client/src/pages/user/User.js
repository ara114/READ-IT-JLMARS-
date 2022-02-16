import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {getStories} from '../../actions/stories';
import Container from '../../components/container/container'
import UserNav from '../user/UserNav'
import { Avatar } from '@material-ui/core';
import CarouselUser from '../../components/carouselUser/CarouselUser'

function User() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	useEffect(() => {
		const token = user?.token;
  
		setUser(JSON.parse(localStorage.getItem('profile')));
	  }, [])

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	
	return (
		<Container nav={<UserNav setUser={setUser}/>}>
			<Avatar style={{ height: '100px', width: '100px' , background: '#8e05c2'}} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
			{user?.result.name}
			<div className="bio">Bio: {user?.result?.bio}</div>
			<div className="favCategories">Favorite Categories: {user?.result?.categoryOne} {user?.result?.categoryTwo}</div>
			<div className="likedStories">
				<label>Liked Stories</label> 
				<CarouselUser/>
			</div>
		</Container>
	)
}

export default User
