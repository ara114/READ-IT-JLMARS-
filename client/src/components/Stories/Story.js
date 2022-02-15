import './Story.css'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'
import { deleteStory, likeStory } from '../../actions/stories'
import React, {useEffect} from 'react';
import {getStories} from '../../actions/stories';
function Story({ story }) {
	const dispatch = useDispatch()
	const user = JSON.parse(localStorage.getItem('profile'));
	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	// const Likes = () => {
	// 	if(story.likes.length > 0) {
	// 		return story.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
	// 		? (
	// 			<><ThumbUpAltIcon fontSize='small' className='likesBtn'/>&nbsp;</>
	// 		)
	// 	}
	// }
	return (
		<div className='item'>
			<div className='link'>
				<Link to={`/${story.storyID}`} className='link' onClick={scrollToTop}>
					<figure className='pictureWrap'>
						<img src={story.image} alt={story.title} className='image' />
					</figure>
					<h5 className='name'>{story.title}</h5>
				</Link>
				<div className='btns'>
					<Button size='small' style={{ color: '#8e05c2' }} onClick={() => dispatch(likeStory(story.storyID))}>
						{story.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (<ThumbUpAltIcon fontSize='small' className='likesBtn' />) : (<ThumbUpAltOutlined fontSize='small' className='likesBtn' />)}
						&nbsp;{story.likes.length}
					</Button>
					<Button size='small' style={{ color: '#8e05c2' }} onClick={() => dispatch(deleteStory(story.storyID))}>
						<DeleteIcon fontSize='small' className='deleteBtn' />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Story
