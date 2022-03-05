import React from 'react'
import Container from '../../components/container/container'
import ModNav from './Components/ModNav'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getStories } from '../../actions/stories'
import { CircularProgress } from '@material-ui/core'
import ModStory from '../../components/Stories/ModStory'
import '../CatPages/Cat.css'

function ModHome() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getStories())
	}, [dispatch])
	const stories = useSelector((state) => state.stories)
	console.log(stories)

	return !stories.length ? (
		<CircularProgress />
	) : (
		<Container nav={<ModNav />}>
			<h1>Reported Stories</h1>
			<div className='cat-container'>{stories.map((story) => <ModStory key={story._id} story={story} />)}</div>
		</Container>
	)
}

export default ModHome
