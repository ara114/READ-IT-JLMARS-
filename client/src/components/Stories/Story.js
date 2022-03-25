import React, {useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { deleteStory, likeStory, reportStory } from '../../actions/stories';
import './Story.css';

function Story({story}) {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('profile'));
	const [isReported, setIsReported] = useState(false);
	const [likes, setLikes] = useState(story?.likes);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	}

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
		  return;
		}
	}

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
		  event.preventDefault();
		  setOpen(false);
		} else if (event.key === 'Escape') {
		  setOpen(false);
		}
	}

	const prevOpen = useRef(open);
	useEffect(() => {
	  if (prevOpen.current === true && open === false) {
		anchorRef.current.focus();
	  }
  
	  prevOpen.current = open;
	}, [open]);

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
						<Button
							ref={anchorRef}
							id="composition-button"
							aria-controls={open ? 'composition-menu' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup="true"
							onClick={handleToggle}
							>
							<MoreHorizIcon/>
						</Button>
						<Popper
							open={open}
							anchorEl={anchorRef.current}
							role={undefined}
							placement="bottom-start"
							transition
							disablePortal
							>
							{({ TransitionProps, placement }) => (
								<Grow
								{...TransitionProps}
								style={{
									transformOrigin:
									placement === 'bottom-start' ? 'left top' : 'left bottom',
								}}
								>
								<Paper>
									<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="composition-menu"
										aria-labelledby="composition-button"
										onKeyDown={handleListKeyDown}
									>
										<MenuItem onClick={() => {navigate(`/Create/${story.storyID}`);}}><EditIcon fontSize='small' style={{ color: '#8e05c2' }}/>&nbsp;Edit</MenuItem>
										<MenuItem onClick={(e) => {setIsReported(true); dispatch(reportStory(story.storyID))}}><FlagOutlinedIcon fontSize='small' style={{ color: '#8e05c2' }} className='deleteBtn' />&nbsp;Report</MenuItem>
										<MenuItem onClick={() => dispatch(deleteStory(story.storyID))}><DeleteIcon fontSize='small' style={{ color: 'red' }} className='deleteBtn' />&nbsp;Delete</MenuItem>
									</MenuList>
									</ClickAwayListener>
								</Paper>
								</Grow>
							)}
						</Popper>
					</div>
				</div>
			</div>
		)
	)
}

export default Story
