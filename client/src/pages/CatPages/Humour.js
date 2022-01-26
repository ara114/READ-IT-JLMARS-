import Container from '../../components/container/container'
import TBox from '../../components/Stories/TBox'
import './Cat.css'
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {getStories} from '../../actions/stories';
import {CircularProgress} from '@material-ui/core';
import NavBar from '../../components/navbar/NavBar';
function Humour() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	const stories = useSelector((state)=> state.stories);
	console.log(stories);


	return (
		!stories.length ? <CircularProgress/> : (
			<Container nav={<NavBar/>}>
				<h1>Humour</h1>
				<div className='cat-container'>
					{stories.map((story) => (
						story.category === 'Humour' && (<TBox key={story._id} img={story.image} to={''} name={story.title} />)
					))}
				</div>
			</Container>
		)

		
	)
}

export default Humour