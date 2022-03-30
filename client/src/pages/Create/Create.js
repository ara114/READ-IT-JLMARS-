import React, { useState, useEffect } from 'react'
import Container from '../../components/container/container'
import { TextField, Button, Typography, Paper, Grow } from '@material-ui/core'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch } from 'react-redux'
import { createStory } from '../../actions/stories'
import TextEditor from '../../components/TextEditor/TextEditor'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'
import { useParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { io } from 'socket.io-client'
import "../Create/Create.css"
const Create = () => {
	const { id: docID } = useParams()
	const dispatchh = useDispatch()
	const [checkSocket, setCheckSocket] = useState(false)
	const [checkSocket1, setCheckSocket1] = useState(false)
	const [storyData, setStoryData] = useState({
		storyID: docID,
		image: '',
		author: [  {
			authorID: '',
			authorName: ''
		  }],
		reports: [],
		title: '',
		story: '',
		category: '',
		clear: false,
		finished: false
	})
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if(!user) navigate('/')
		else setCheckSocket(true)
	}, [])

	const classes = useStyles()
	const navigate = useNavigate()
	const [copied, setCopied] = useState(false)

	const [socket, setSocket] = useState()

	useEffect(() => {
		const s = io('http://localhost:5000')
		setSocket(s)

		return () => {
			s.disconnect()
		}
	}, [])

	useEffect(() => {
		if (socket == null) return
		socket.emit('send-author', ({ authorID: `${user?.result?._id}`, authorName: `${user?.result?.name}`}))
		console.log('send-author');
	},[socket])

	useEffect(() => {
		if (socket == null) return
		const handler = (titles) => {
			setStoryData({ ...storyData, title: titles })
		}
		socket.on('receive-title', handler)

		return () => {
			socket.off('receive-title', handler)

		}
	}, [socket,storyData]);

	useEffect(() => {
		if (socket == null) return
		const handler = (authors) => {
			setStoryData({ ...storyData, author: authors });
			console.log('recieve', storyData.author)
		}
		socket.on('receive-author', handler)

		return () => {
			socket.off('receive-author', handler)

		}
	}, [socket]);

	useEffect(() => {
		if (socket == null) return
		const handler = (img) => {
			setStoryData({ ...storyData, image: img })
		}
		socket.on('receive-image', handler)

		return () => {
			socket.off('receive-image', handler)

		}
	}, [socket,storyData])

	useEffect(() => {
		if (socket == null) return
		const handler = (categories) => {
			setStoryData({ ...storyData, category: categories })
		}
		socket.on('receive-category', handler)

		return () => {
			socket.off('receive-category', handler)

		}
	}, [socket,storyData])

	useEffect(() => {
		if (socket == null) return
		const handler = (storyDat) => {
			navigate('/home', { replace: true })
		}
		socket.on('receive-form', handler)

		return () => {
			socket.off('receive-form', handler)

		}
	}, [socket, dispatchh])

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(storyData)
		dispatchh(createStory(storyData));
		navigate('/home', { replace: true })

	}
	// function refreshPage() {
	// 	window.location.reload(false);
	//   }

	return (
		<Container nav={<NavBar />}>
			{/* {console.log(window.location.pathname)} */}
			<Grow in>
				<Paper className={classes.paper}>
					<Button className="leaveBtn" variant='contained' style={{ backgroundColor: 'red', color: '#fff' }} size='small' onClick={(e) => {handleSubmit(e); socket.emit('leave-room', ({ authorID: `${user?.result?._id}`, authorName: `${user?.result?.name}`}))}}>
							Leave
						</Button>
					<form autoComplete='off' className={`${classes.root} ${classes.form} createForm`} onSubmit={(e) => {handleSubmit(e); socket.emit('form-submit', storyData)}}>
						<Typography variant='h6'>Room code:</Typography>
						<TextField
							disabled
							fullWidth
							variant='outlined'
							defaultValue={docID}
							size='small'
							inputProps={{ style: { textAlign: 'center' } }}
						/>
						<CopyToClipboard text={docID} onCopy={() => setCopied(true)}>
							<Button variant='contained' style={{ backgroundColor: '#8e05c2', color: '#fff' }}>
								{!copied ? 'Copy' : 'Copied!'}
							</Button>
						</CopyToClipboard>
						{/* <Typography variant="h6">{currentID ? 'Editing' : 'Creating'} a memory</Typography> */}
						{/* <Typography variant="h6"> Room code: {makeid()}</Typography> */}
						<div className={classes.fileInput}>
							<Typography variant='h6'>Upload Cover Page</Typography>
							<FileBase type='file' multiple={false} onDone={({ base64 }) => {setStoryData({ ...storyData, image: base64 }); socket.emit('send-image', base64)}} required />
						</div>
						<FormControl fullWidth margin='normal'>
							<InputLabel id='demo-simple-select-label'>Category</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={storyData.category}
								label='Category'
								size='small'
								sx={{ margin: 1 }}
								onChange={(e) => {setStoryData({ ...storyData, category: e.target.value }); socket.emit('send-category', e.target.value)}}
								required
							>
								<MenuItem value={'Adventure'} className='menuItems'>
									Adventure
								</MenuItem>
								<MenuItem value={'Horror'} className='menuItems'>
									Horror
								</MenuItem>
								<MenuItem value={'Humour'} className='menuItems'>
									Humour
								</MenuItem>
								<MenuItem value={'Non-Fiction'} className='menuItems'>
									Non-Fiction
								</MenuItem>
								<MenuItem value={'Romance'} className='menuItems'>
									Romance
								</MenuItem>
							</Select>
						</FormControl>
						{/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})}/> */}
						<TextField
							name='title'
							variant='outlined'
							label='Title'
							fullWidth
							size='small'
							value={storyData.title}
							onChange={(e) => {setStoryData({ ...storyData, title: e.target.value }); socket.emit('send-title', e.target.value)}}
							required
						/>
						<div className='authorNameBox'>
						<Typography variant="h6"><strong>Author(s): &nbsp;</strong></Typography>
						{storyData.author.map(
							(authorr, index) => (
								<Typography key={index}  variant="h6" >{authorr.authorName}{index < storyData.author.length - 1 ? ",  " : ""} &nbsp;</Typography>
							))}
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</div>
						<TextEditor docID={docID} socket={socket} storyData={storyData} setStoryData={setStoryData}/>
						<Button
							className={classes.buttonSubmit}
							variant='contained'
							style={{ backgroundColor: '#8e05c2', color: '#fff' }}
							size='large'
							type='submit'
							fullWidth
						>
							Upload
						</Button>
					</form>
				</Paper>
			</Grow>
		</Container>
	)
}

export default Create
