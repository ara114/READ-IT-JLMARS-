import Recommended from '../../components/Recommended/Recommended'
import Categories from '../../components/Categories/Categories'
import Write from '../../components/Write/Write'
import Container from '../../components/container/container'
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {getStories} from '../../actions/stories';
import NavBar from '../../components/navbar/NavBar';
import { useNavigate } from 'react-router-dom'
function Home({ handleLogout }) {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if(!user) navigate('/')
	}, [])
	
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
