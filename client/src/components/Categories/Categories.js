import React from 'react'
import './Categories.css'
import '../Line.css'
import { Link } from 'react-router-dom'
const Categories = () => {

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	return (
		<div className='category-header'>
			<br></br>
			Categories
			{/* <hr className='line'></hr> */}
			<div className='links-container'>
				<br></br>
				<Link to='/category/Adventure' className='nostyle categories Adventure' onClick={scrollToTop}>
					Adventure
				</Link>
				<Link to='/category/Horror' className='nostyle categories Horror' onClick={scrollToTop}>
					Horror
				</Link>
				<Link to='/category/Romance' className='nostyle categories Romance' onClick={scrollToTop}>
					Romance
				</Link>
				<Link to='/category/Humour' className='nostyle categories Humour' onClick={scrollToTop}>
					Humour
				</Link>
				<Link to='/category/Nonfiction' className='nostyle categories Non-fiction' onClick={scrollToTop}>
					Non-fiction
				</Link>
			</div>
		</div>
	)
}

export default Categories