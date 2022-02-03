import './Story.css'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteStory, likeStory } from '../../actions/stories';
function Story({story}) {
	const dispatch = useDispatch();
	return (
		<div className='item'>
			<div className='link'>
				<Link to={`/${story.storyID}`} className='link'>
				<figure className='pictureWrap'>
					<img src={story.image} alt={story.title} className='image' />
				</figure>
				<h5 className='name'>{story.title}</h5>
				</Link>
				<div className='btns'>
					<Button size='small' style={{ color: '#8e05c2'}} onClick={() => dispatch(likeStory(story.storyID))}>
						<ThumbUpAltIcon fontSize='small'/>
						&nbsp;{story.likeCount}
					</Button>
					<Button size='small' style={{ color: '#8e05c2'}} onClick={() => dispatch(deleteStory(story.storyID))}>
						<DeleteIcon fontSize='small'/>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Story
