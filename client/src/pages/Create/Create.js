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

const Create = () => {
	const { id: docID } = useParams()
	const dispatchh = useDispatch()

	const classes = useStyles()
	const navigate = useNavigate()
	const [copied, setCopied] = useState(false)
	const [storyData, setStoryData] = useState({
		storyID: docID,
		image: '',
		author: '',
		title: '',
		story: '',
		category: '',
	})
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if(!user) navigate('/')
	}, [])

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
			setStoryData({ ...storyData, author: authors })
		}
		socket.on('receive-author', handler)

		return () => {
			socket.off('receive-author', handler)

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
			dispatchh(createStory(storyDat));
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
		
		navigate('/home', { replace: true })

	}

	return (
		<Container nav={<NavBar />}>
			{/* {console.log(window.location.pathname)} */}
			<Grow in>
				<Paper className={classes.paper}>
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
							<FileBase type='file' multiple={false} onDone={({ base64 }) => setStoryData({ ...storyData, image: base64 })} required />
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
						<TextField
							name='author'
							variant='outlined'
							label='Author'
							fullWidth
							size='small'
							value={storyData.author}
							onChange={(e) => {setStoryData({ ...storyData, author: e.target.value }); socket.emit('send-author', e.target.value)}}
							required
						/>
						{/* <TextField multiline rows={10} name="story" variant="outlined" label="Text Editor" fullWidth value={storyData.story} onChange={(e) => setStoryData({...storyData, story: e.target.value})} required /> */}
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
