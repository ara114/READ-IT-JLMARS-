import Container from '../../components/container/container'
import Story from '../../components/Stories/Story'
import './Cat.css'
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {getStories} from '../../actions/stories';
import {CircularProgress} from '@material-ui/core';
import NavBar from '../../components/navbar/NavBar';
function NonFiction() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	const stories = useSelector((state)=> state.stories);
	console.log(stories);

	return (
		!stories.length ? <CircularProgress/> : (
			<Container nav={<NavBar/>}>
				<h1>Non-Fiction</h1>
				<div className='cat-container'>
					{stories.map((story) => (
						story.category === 'Non-Fiction' && (<Story key={story._id} story={story}/>)
					))}
				</div>
			</Container>
		)

		
	)
}

export default NonFiction