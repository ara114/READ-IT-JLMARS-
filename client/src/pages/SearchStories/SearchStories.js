import Container from '../../components/container/container'
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getStoriesBySearch} from '../../actions/stories';
import NavBar from '../../components/navbar/NavBar';
import Search from '../../components/Search/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import Story from '../../components/Stories/Story';
import '../CatPages/Cat.css';

function useQuery() {
	return new URLSearchParams(useLocation().search);
  }

function SearchStories() {
	const query = useQuery();
	console.log("search story", query);
	const searchQuery = query.get('searchQuery');
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if(!user) navigate('/')
	}, [])
	
	useEffect(() => {
		dispatch(getStoriesBySearch(searchQuery));
	}, [dispatch]);

	const stories = useSelector((state)=> state.stories);
	console.log("search", stories);

	return (
		<Container nav={<NavBar/>} contentClass='content'>
			<Search/>
			<div className='cat-container'>
				{stories.map((story) => (
					story.reports.length === 0 && story.finished === true &&
					<Story key={story._id} story={story}/>
				))}
			</div>
		</Container>
	)
}

export default SearchStories
