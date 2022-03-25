import './Story.css'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import FlagIcon from '@mui/icons-material/Flag';
import { useDispatch } from 'react-redux'
import { deleteStory, likeStory, reportStory } from '../../actions/stories'
import React, {useEffect, useState } from 'react';
function Story({story}) {
	const dispatch = useDispatch()
	const user = JSON.parse(localStorage.getItem('profile'));
	const [isReported, setIsReported] = useState(false);
	const [likes, setLikes] = useState(story?.likes);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const handleLike = async () => {
		dispatch(likeStory(story.storyID));
		if(story.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)))
			setLikes(story.likes.filter((id) => id !== (user?.result?._id)))
		else
			setLikes([...story.likes, user?.result?._id])
	}
	return (
		story.reports.find((report) => report === user?.result?._id) ?  (
			<div className='item'>
				<div className='link'>
					{story.title}
					<p>Reported story: Story is being reviewed.</p>
					<div className='btns'>
					</div>
				</div>
			</div>
		) : (
			<div className='item'>
				<div className='link'>
					<Link to={`/Display/${story.storyID}`} className='link' onClick={scrollToTop}>
						<figure className='pictureWrap'>
							<img src={story.image} alt={story.title} className='image' />
						</figure>
						<h5 className='name'>{story.title}</h5>
					</Link>
					<div className='btns'>
						<Button size='small' style={{ color: '#8e05c2' }} onClick={handleLike}>
							{likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (<ThumbUpAltIcon fontSize='small' className='likesBtn' />) : (<ThumbUpAltOutlined fontSize='small' className='likesBtn' />)}
							&nbsp;{likes.length}
						</Button>
						<Button size='small' style={{ color: '#8e05c2' }} onClick={() => {setIsReported(true); dispatch(reportStory(story.storyID))}}>
							<FlagIcon fontSize='small' className='deleteBtn' />
						</Button>
						<Button size='small' style={{ color: '#8e05c2' }} onClick={() => dispatch(deleteStory(story.storyID))}>
							<DeleteIcon fontSize='small' className='deleteBtn' />
						</Button>
					</div>
				</div>
			</div>
		)
	)
}

export default Story
