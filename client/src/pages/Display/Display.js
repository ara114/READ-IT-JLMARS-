import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStories } from '../../actions/stories'
import { getUsers } from '../../actions/auth'
import NavBar from '../../components/navbar/NavBar'
import Container from '../../components/container/container'
import { Link } from 'react-router-dom'
import 'quill/dist/quill.bubble.css'
import './Display.css'
import { v4 as uuidV4 } from 'uuid'
import Reviews from '../../components/Reviews/Reviews'
const Display = () => {
	const { id: storyId } = useParams()
	// console.log(storyId)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories())
	}, [dispatch])
	useEffect(() => {
		dispatch(getUsers())
	}, [])
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
							<div className='author-container'>
								Author(s):&nbsp;
								{storyy.author.map(
							(authorr, index) => (
								<Link key={index} to={`/${authorr.authorID}`} className='author'>{authorr.authorName}{index < storyy.author.length - 1 ? "," : ""}&nbsp;</Link>
							))}
							</div>
							<div className='author-container'>Category:&nbsp;<Link to={`/category/${storyy.category}`} className='author'>{storyy.category}</Link></div>
							{storyy.mashup === true && (
								<div className='originalStory-container' >
									Original Story: &nbsp;
									<Link to={`/Display/${storyy.originalStory.storyID}`}>
										{storyy.originalStory.title}
									</Link>
								</div>)}
							{/* {console.log(storyy.story)} */}
							<div className="write-container">
								<Link to={`/read/${storyy.storyID}`} className='nostyle write Create' onClick={scrollToTop}>Read</Link>
								<Link to={`/Mashup/${storyy.storyID}-${uuidV4()}`} className='nostyle write Join' onClick={scrollToTop}>Mashup</Link>
							</div>
							<Reviews story={storyy}/>
						</div>
					)
			)}
		</Container>
	)
}

export default Display
