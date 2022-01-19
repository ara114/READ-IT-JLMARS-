import './Boxes.css'
import React from 'react'
import { Link } from 'react-router-dom'
const LWrap = () => {
	const boxInfo = [
		{ image: '/images/universe.png', to: { pathname: '/home' }, name: 'Universe and I', alt: 'first pic' },
		{ image: '/images/roses.png', to: { pathname: '/home' }, name: 'Roses and Guns', alt: 'second pic' },
		{ image: '/images/way.png', to: { pathname: '/home' }, name: 'The way back home', alt: 'third pic' },
		{ image: '/images/abracadabra.png', to: { pathname: '' }, name: 'Abracadabra', alt: 'fourth pic' },
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

export default LWrap
