import React from 'react'
import Container from '../../components/container/container'
import NavBar from '../../components/navbar/NavBar'
import UserNav from '../user/UserNav'
import Recommended from '../../components/Recommended/Recommended'
import Categories from '../../components/Categories/Categories'
import Write from '../../components/Write/Write'

function User() {
	return (
		<Container nav={<UserNav />}>
			{/* <Recommended /> */}
			<Categories />
			<Write />
		</Container>
	)
}

export default User
