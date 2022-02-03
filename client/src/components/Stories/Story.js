import './Story.css'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteStory, likeStory } from '../../actions/stories';
function Story(props) {
	const dispatch = useDispatch();
	return (
		<div className='item'>
			<div className='link'>
				<Link to={props.to} className='link'>
				<figure className='pictureWrap'>
					<img src={props.img} alt={props.alt} className='image' />
				</figure>
				<h5 className='name'>{props.name}</h5>
				</Link>
				<div className='btns'>
					<Button size='small' style={{ color: '#8e05c2'}} onClick={() => dispatch(likeStory(props.storyID))}>
						<ThumbUpAltIcon fontSize='small'/>
						&nbsp;{props.likes}
					</Button>
					<Button size='small' style={{ color: '#8e05c2'}} onClick={() => dispatch(deleteStory(props.storyID))}>
						<DeleteIcon fontSize='small'/>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Story
