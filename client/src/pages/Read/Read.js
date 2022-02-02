import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStories } from '../../actions/stories'
import NavBar from '../../components/navbar/NavBar'
import Container from '../../components/container/container'
import { Link } from 'react-router-dom'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import './Read.css'
const Read = () => {
	const { id: storyId } = useParams()
	// console.log(storyId)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories())
	}, [dispatch])
	const stories = useSelector((state) => state.stories)
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
							{/* <p>HEllo {JSON.stringify(storyy.story)}</p> */}
						</div>
					)
			)}
		</Container>
	)
}

export default Read
