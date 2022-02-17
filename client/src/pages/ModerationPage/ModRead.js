// import React, { useEffect, useCallback } from 'react'
// import { useParams } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { getStories } from '../../actions/stories'
// import Container from '../../components/container/container'
// import Quill from 'quill'
// import 'quill/dist/quill.bubble.css'
// import '../Read/Read.css'
// import ModNav from './Components/ModNav'
// const Read = () => {
// 	const { id: storyId } = useParams()
// 	// console.log(storyId)
// 	const dispatch = useDispatch()
// 	useEffect(() => {
// 		dispatch(getStories())
// 	}, [dispatch])
// 	const stories = useSelector((state) => state.stories)

// 	const wrapperRef = useCallback((wrapper) => {
// 		if (wrapper == null) return
// 		wrapper.innerHTML = ''
// 		const editor = document.createElement('div')
// 		wrapper.append(editor)
// 		const q = new Quill(editor, { theme: 'bubble' })
// 		q.disable()
// 		{
// 			stories.map((storyy) => {
// 				if (storyy.storyID === `${storyId}`) q.setContents(storyy.story)
// 			})
// 		}
// 	}, [])
// 	return (
// 		<Container contentClass={'content'} nav={<ModNav />}>
// 			{stories.map(
// 				(storyy) =>
// 					storyy.storyID === `${storyId}` && (
// 						<div key={storyy._id}>
// 							<div className='img-container'>
// 								<img src={storyy.image} alt={`${storyy.title}`} className='readImg' />
// 							</div>
// 							<div className='title-container'>{storyy.title}</div>
// 							<div className='author-container'>Author(s): {storyy.author}</div>
// 							<div className='text-content storyContent' ref={wrapperRef}></div>
// 							{console.log(storyy.story)}
// 						</div>
// 					)
// 			)}
// 		</Container>
// 	)
// }

// export default Read

//Use this for the stories that are going to be in the reported page...
