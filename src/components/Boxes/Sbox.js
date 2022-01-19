import './Boxes.css'
import React from 'react'
import { Link } from 'react-router-dom'
const Sbox = () => {
	const boxInfo = [
		{ image: '', to: { pathname: '/home' }, name: 'Test', alt: 'first pic' },
		{ image: '', to: { pathname: '/home' }, name: 'Hopefully', alt: 'second pic' },
		{ image: '', to: { pathname: '/home' }, name: 'it', alt: 'third pic' },
		{ image: '', to: { pathname: '' }, name: 'Works', alt: 'fourth pic' },
	]

	const renderInfo = (box, index) => {
		return (
			<li className='boxItem' key={index}>
				<Link className='boxLink' to={box.to}>
					<figure className='picWrap'>
						<img src={box.image} alt={box.alt} className='img' />
					</figure>
					<h5 className='boxName'>{box.name}</h5>
					{/* <div className='boxInfo'>
						<h5 className='boxName'>{props.name}</h5>
					</div> */}
				</Link>
			</li>
		)
	}

	return (
		<div className='boxes'>
			<div className='boxContainer'>
				<div className='boxWrapper'>
					<ul className='boxItem'>{boxInfo.map(renderInfo)}</ul>
				</div>
			</div>
		</div>
	)
}

export default Sbox
