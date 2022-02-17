import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if(!user) navigate('/')
	}, [])


	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return
		wrapper.innerHTML = ''
		const editor = document.createElement('div')
		wrapper.append(editor)
		const q = new Quill(editor, { theme: 'bubble' })
		q.disable()
		{
			stories.map((storyy) => {
				if (storyy.storyID === `${storyId}`) q.setContents(storyy.story)
			})
		}
	}, [])
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
							<div className='text-content storyContent' ref={wrapperRef}></div>
							{console.log(storyy.story)}
						</div>
					)
			)}
		</Container>
	)
}

export default Read
