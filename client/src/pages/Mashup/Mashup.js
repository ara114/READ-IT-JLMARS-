import React, { useState, useEffect } from 'react'
import Container from '../../components/container/container'
import { TextField, Button, Typography, Paper, Grow } from '@material-ui/core'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { createStory } from '../../actions/stories'
import MashupTextEditor from '../../components/TextEditor/MashupTextEditor'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'
import { useParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { io } from 'socket.io-client'

const Mashup = () => {
	const { id: docID } = useParams()
	const dispatchh = useDispatch()
	const stories = useSelector((state)=> state.stories);
	const [checkSocket, setCheckSocket] = useState(false)
	const [checkSocket1, setCheckSocket1] = useState(false)
  const docSlice1 = docID.slice(0, 36);
  const docSlice2 = docID.slice(37, docID.length);
  console.log('docSlice1: ',docSlice1);
  console.log('docSlice2: ',docSlice2);

  var storyy = null;
  console.log('stories: ',stories);
  stories.map((story) => {
    if(story.storyID === docSlice1)
    	storyy = story
  })
  console.log('story',storyy);

	const [storyData, setStoryData] = useState({
		storyID: docSlice2,
		image: storyy.image,
		reports: storyy.reports,
		title: storyy.title,
		story: storyy.story,
		category: storyy.category,
		clear: storyy.clear,
		finished: false,
    	mashup: true
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

	// useEffect(() => {
	// 	if (socket == null) return
	// 	socket.emit('send-author-mashup', `${user?.result?.name}`)
	// 	console.log('send-mashup: ', `${user?.result?.name}`)
	// 	setCheckSocket1(true)
	// },[checkSocket])

	useEffect(() => {
		if (socket == null) return
		const handler = (titles) => {
			setStoryData({ ...storyData, title: titles })
		}
		socket.on('receive-title-mashup', handler)

		return () => {
			socket.off('receive-title-mashup', handler)

		}
	}, [socket,storyData]);

	// useEffect(() => {
	// 	if (socket == null) return
	// 	const handler = (authors) => {
	// 		setStoryData({ ...storyData, author: authors })
	// 		console.log('receive: ', storyData.author)
	// 	}
	// 	socket.on('receive-author', handler)

	// 	return () => {
	// 		socket.off('receive-author', handler)

	// 	}
	// }, [checkSocket1])

	useEffect(() => {
		if (socket == null) return
		const handler = (img) => {
			setStoryData({ ...storyData, image: img })
		}
		socket.on('receive-image-mashup', handler)

		return () => {
			socket.off('receive-image-mashup', handler)

		}
	}, [socket,storyData])

	useEffect(() => {
		if (socket == null) return
		const handler = (categories) => {
			setStoryData({ ...storyData, category: categories })
		}
		socket.on('receive-category-mashup', handler)

		return () => {
			socket.off('receive-category-mashup', handler)

		}
	}, [socket,storyData])

	useEffect(() => {
		if (socket == null) return
		const handler = (storyDat) => {
			navigate('/home', { replace: true })
		}
		socket.on('receive-form-mashup', handler)

		return () => {
			socket.off('receive-form-mashup', handler)

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
					<form autoComplete='off' className={`${classes.root} ${classes.form} createForm`} onSubmit={(e) => {handleSubmit(e); socket.emit('form-submit-mashup', storyData)}}>
						<Button
							className={classes.buttonSubmit}
							variant='contained'
							style={{ backgroundColor: 'red', color: '#fff' }}
							size='small'
							onClick={(e) => {handleSubmit(e); socket.emit('leave-room-mashup', `${user?.result?.name}`)}}
						>
							Leave
						</Button>
						<Typography variant='h6'>Room code:</Typography>
						<TextField
							disabled
							fullWidth
							variant='outlined'
							defaultValue={docSlice2}
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
							<FileBase type='file' multiple={false} onDone={({ base64 }) => {setStoryData({ ...storyData, image: base64 }); socket.emit('send-image-mashup', base64)}} required />
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
								onChange={(e) => {setStoryData({ ...storyData, category: e.target.value }); socket.emit('send-category-mashup', e.target.value)}}
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
							onChange={(e) => {setStoryData({ ...storyData, title: e.target.value }); socket.emit('send-title-mashup', e.target.value)}}
							required
						/>
						{/* If you do not see your name in the author(s) section, reload the page. */}
						{/* <TextField
							disabled
							name='author'
							variant='outlined'
							label='Author(s)'
							fullWidth
							size='small'
							value={storyData.author}
							required
						/> */}

						<MashupTextEditor docID={docSlice2} docID2={docSlice1} socket={socket} storyData={storyData} setStoryData={setStoryData}/>
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

export default Mashup