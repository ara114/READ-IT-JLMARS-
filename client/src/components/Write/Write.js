import React from 'react'
import './Write.css'
import { Link } from 'react-router-dom'
import {v4 as uuidV4} from 'uuid' 
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
                <Link to={`/Create/${uuidV4()}`} className='nostyle write Create' onClick={scrollToTop}>Create a Lobby</Link>
                <Link to='/Join' className='nostyle write Join' onClick={scrollToTop}>Join a Lobby</Link>
            </div>
        </div>
    )
}

export default Write
