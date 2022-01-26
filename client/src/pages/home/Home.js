import Recommended from '../../components/Recommended/Recommended'
import Categories from '../../components/Categories/Categories'
import Write from '../../components/Write/Write'
import Container from '../../components/container/container'
import {getStories} from '../../actions/stories';
import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import NavBar from '../../components/navbar/NavBar';
function Home({ handleLogout }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	return (
		<Container nav={<NavBar/>}>
			<Recommended />
			<Categories />
			<Write />
		</Container>
	)
}

export default Home
