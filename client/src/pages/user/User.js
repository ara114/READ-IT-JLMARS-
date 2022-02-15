import React, { useState, useEffect } from 'react'
import Container from '../../components/container/container'
import UserNav from '../user/UserNav'
import { Avatar } from '@material-ui/core';

function User() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	useEffect(() => {
		const token = user?.token;
  
		setUser(JSON.parse(localStorage.getItem('profile')));
	  }, [])
	return (
		<Container nav={<UserNav setUser={setUser}/>}>
			<Avatar style={{ height: '100px', width: '100px' , background: '#8e05c2'}} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
			{user?.result.name}
		</Container>
	)
}

export default User
