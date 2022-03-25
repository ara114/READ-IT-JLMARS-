import './Story.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, {useEffect } from 'react';
import {getStories} from '../../actions/stories';
function Story({story}) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		story.reports.length!==0 && (
			<div className='item'>
				<div className='link'>
					<Link to={`/modDisplay/${story.storyID}`} className='link' onClick={scrollToTop}>
						<figure className='pictureWrap'>
							<img src={story.image} alt={story.title} className='image' />
						</figure>
						<h5 className='name'>{story.title}</h5>
					</Link>
				</div>
			</div>
		) 
	)
}

export default Story
