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
import { getUsers } from '../../actions/auth';
import './Story.css';
import imgR from '../../images/reported.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Story({story}) {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('profile'));
	const [isReported, setIsReported] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [likes, setLikes] = useState(story?.likes);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	}

	const handleClose = (event) => {
		setOpen(false);
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

	const [reportOpen, reportSetOpen] = useState(false);

	const handleClickOpen = () => {
    	reportSetOpen(true);
  	};

	const handleCloseReport = () => {
		reportSetOpen(false);
	};

	const [deleteOpen, deleteSetOpen] = useState(false);

	const handleClickOpenDelete = () => {
    	deleteSetOpen(true);
  	};

	const handleCloseDelete = () => {
		deleteSetOpen(false);
	};

  

	const handleLike = async () => {
		dispatch(likeStory(story.storyID));
		if(story.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)))
			setLikes(story.likes.filter((id) => id !== (user?.result?._id)))
		else
			setLikes([...story.likes, user?.result?._id])
	}
	return (
		!isDeleted && 
		(<>
		{(story.reports.find((report) => report === user?.result?._id) || isReported) ?  (
			<div className='item'>
				<div className='link'>
				<figure className='pictureWrap'>
							<img src={imgR} alt={story.title} className='image' />
						</figure>
						<h5 id="reportedName" className='name'>{story.title}</h5>
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
						<Button id="likeBtn" size='small' style={{ color: '#8e05c2' }} onClick={handleLike}>
							{likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (<ThumbUpAltIcon fontSize='small' className='likesBtn' />) : (<ThumbUpAltOutlined fontSize='small' className='likesBtn' />)}
							&nbsp;{likes.length}
						</Button>
						<Button
							ref={anchorRef}
							id="composition-button"
							size='small'
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
										{story.author.find((authors) => authors.authorID === user?.result?._id) &&<MenuItem onClick={() => { handleToggle(); navigate(`/Create/${story.storyID}`);}}><EditIcon fontSize='small' style={{ color: '#8e05c2' }}/>&nbsp;Edit</MenuItem>}
										{/* {!story.author.find((authors) => authors.authorID === user?.result?._id) && <MenuItem onClick={(e) => {setIsReported(true); dispatch(reportStory(story.storyID))}}><FlagOutlinedIcon fontSize='small' style={{ color: '#8e05c2' }} className='deleteBtn' />&nbsp;Report</MenuItem>} */}
										{!story.author.find((authors) => authors.authorID === user?.result?._id) && <MenuItem onClick={() => { handleToggle(); handleClickOpen(); }}><FlagOutlinedIcon fontSize='small' style={{ color: '#8e05c2' }} className='deleteBtn' />&nbsp;Report</MenuItem>}
										{/* {story.author.find((authors) => authors.authorID === user?.result?._id) &&<MenuItem onClick={() => dispatch(deleteStory(story.storyID))}><DeleteIcon fontSize='small' style={{ color: 'red' }} className='deleteBtn' />&nbsp;Delete</MenuItem>} */}
										{story.author.find((authors) => authors.authorID === user?.result?._id) &&<MenuItem onClick={() => { handleToggle(); handleClickOpenDelete(); }}><DeleteIcon fontSize='small' style={{ color: 'red' }} className='deleteBtn' />&nbsp;Delete</MenuItem>}
									</MenuList>
									</ClickAwayListener>
								</Paper>
								</Grow>
							)}
						</Popper>
					</div>
				</div>
			</div>
		)}
		<Dialog
			open={reportOpen}
			onClose={handleCloseReport}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
			{"Are you sure you want to report this story?"}
			</DialogTitle>
			<DialogContent>
			<DialogContentText id="alert-dialog-description">
				If you do so, you will not be able to see the content of this story until it is reviewed and approved by the moderators.
			</DialogContentText>
			</DialogContent>
			<DialogActions>
			<Button onClick={() => {dispatch(reportStory(story.storyID)); setIsReported(true); handleCloseReport();}} autoFocus style={{ color: '#8e05c2' }}>Yes</Button>
			<Button onClick={handleCloseReport} >
				No
			</Button>
			</DialogActions>
		</Dialog>
		<Dialog
			open={deleteOpen}
			onClose={handleCloseDelete}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
			{"Are you sure you want to delete this story?"}
			</DialogTitle>
			<DialogContent>
			<DialogContentText id="alert-dialog-description">
				This action is permanent and you will not be able to recover your story.
			</DialogContentText>
			</DialogContent>
			<DialogActions>
			<Button onClick={() => {dispatch(deleteStory(story.storyID)); setIsDeleted(true); handleCloseDelete();}} autoFocus style={{ color: '#8e05c2' }}>Yes</Button>
			<Button onClick={handleCloseDelete} >
				No
			</Button>
			</DialogActions>
		</Dialog>
		</>)
	)
}

export default Story
