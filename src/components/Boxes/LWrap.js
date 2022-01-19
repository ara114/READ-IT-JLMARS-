import Box from './Box'
import './Boxes.css'
import React from 'react'

const LWrap = () => {
    return (
		<div className='boxes'>
			<div className='boxContainer'>
				<div className='boxWrapper'>
					<ul className='boxItem'>
						<Box src='images/universe.png' to={{ pathname: '/home' }} name='Universe and I'/>
						<Box src='images/roses.png' to={{ pathname: '/home' }} name='Roses and Guns'/>
						<Box src='images/way.png' to={{ pathname: '/home' }} name='The way back home'/>
						<Box
							src='images/abracadabra.png'
							to={{ pathname: '' }}
							name='Abracadabra'
						/>
					</ul>
					{/* <ul className='boxItem'>
						<Box src='images/universe.png' to={{ pathname: '' }} name='Universe and I'/>
						<Box src='images/roses.png' to={{ pathname: '' }} name='Roses and Guns'/>
						<Box src='images/way.png' to={{ pathname: '' }} name='The way back home'/>
						<Box
							src='images/abracadabra.png'
							to={{ pathname: '//github.com/msadiq10' }}
							name='Abracadabra'
						/>
					</ul> */}
				</div>
			</div>
		</div>
    )
}

export default LWrap
