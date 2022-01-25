import React from 'react'
import './Write.css'
import { Link } from 'react-router-dom'
const Write = () => {
    const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
    return (
        <div className="write-header">
            Write
            <div className="write-container">
                <Link to='/Create' className='nostyle write Create' onClick={scrollToTop}>Create a Lobby</Link>
                <Link to='/Join' className='nostyle write Join'>Join a Lobby</Link>
            </div>
        </div>
    )
}

export default Write
