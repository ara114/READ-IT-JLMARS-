import Recommended from '../../components/Recommended/Recommended'
import Categories from '../../components/Categories/Categories'
import Write from '../../components/Write/Write'
import Container from '../../components/container/container'
import React from 'react';
import NavBar from '../../components/navbar/NavBar';
function Home({ handleLogout }) {
	return (
		<Container nav={<NavBar/>}>
			<Recommended />
			<Categories />
			<Write />
		</Container>
	)
}

export default Home
