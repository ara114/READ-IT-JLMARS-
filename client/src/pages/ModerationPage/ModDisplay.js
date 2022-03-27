import React, { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStories } from '../../actions/stories'
import ModNav from './Components/ModNav'
import Container from '../../components/container/container'
import { Link } from 'react-router-dom'
import Quill from 'quill'
import { deleteStory, unreportStory } from '../../actions/stories'
import 'quill/dist/quill.bubble.css'
import './ModDisplay.css'
const Display = () => {
	const { id: storyId } = useParams();
	// console.log(storyId)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories())
	}, [dispatch])
	const stories = useSelector((state) => state.stories)

	// const navigate = useNavigate();
	// const user = JSON.parse(localStorage.getItem('profile'));

	// useEffect(() => {
	// 	if(!user) navigate('/')
	// }, [])


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
		<Container contentClass={'content'} nav={<ModNav />}>
			{stories.map(
				(storyy) =>
					storyy.storyID === `${storyId}` && (
						<div key={storyy._id}>
                                {/* <div className="write-container">
							    </div> */}
                                <div className="cover">
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
                                </div>
								<div className="DisplayGrid">
									<div id= "modCont" className="write-container">
										<Link to={`/modhome`}  className='nostyle write Create' onClick={() => dispatch(unreportStory(storyy.storyID))}>Mark Approriate</Link>
										<Link to={'/modhome'} className='nostyle write Join' onClick={() => dispatch(deleteStory(storyy.storyID))}>Delete</Link>
										<Link to={`/modwarn/${storyy.storyID}`} className='nostyle write Create'>Warn Author</Link>
									</div>
                            </div>
							<div className='text-content storyContent' ref={wrapperRef}></div>
							{/* {console.log(storyy.story)} */}
						</div>
					)
			)}
		</Container>
	)
}

export default Display
