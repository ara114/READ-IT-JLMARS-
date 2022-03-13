import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStories } from '../../actions/stories'
import NavBar from '../../components/navbar/NavBar'
import Container from '../../components/container/container'
import { Link } from 'react-router-dom'
import 'quill/dist/quill.bubble.css'
import './Display.css'
import { v4 as uuidV4 } from 'uuid'
const Display = () => {
	const { id: storyId } = useParams()
	// console.log(storyId)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories())
	}, [dispatch])
	const stories = useSelector((state) => state.stories)

	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if(!user) navigate('/')
	}, [])


	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<Container contentClass={'content'} nav={<NavBar />}>
			{stories.map(
				(storyy) =>
					storyy.storyID === `${storyId}` && (
						<div key={storyy._id}>
							<div className='img-container'>
								<img src={storyy.image} alt={`${storyy.title}`} className='readImg' />
							</div>
							<div className='title-container'>{storyy.title}</div>
							<div className='author-container'>Author(s): {storyy.author}</div>
							{storyy.mashup === true && (
								<div className='originalStory-container' >
									Original Story: &nbsp;
									<Link to={`/Display/${storyy.originalStory.storyID}`}>
										{storyy.originalStory.title}
									</Link>
								</div>)}
							{/* {console.log(storyy.story)} */}
							<div className="write-container">
								<Link to={`/${storyy.storyID}`} className='nostyle write Create' onClick={scrollToTop}>Read</Link>
								<Link to={`/Mashup/${storyy.storyID}-${uuidV4()}`} className='nostyle write Join' onClick={scrollToTop}>Mashup</Link>
							</div>
						</div>
					)
			)}
		</Container>
	)
}

export default Display
