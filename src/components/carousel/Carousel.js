import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './carousel.css'
import TBox from '../Boxes/TBox'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
function Carousel() {
	const boxInfo = [
		{ image: '/images/universe.png', to: { pathname: '/home' }, name: 'Universe and I', alt: 'first pic' },
		{ image: '/images/roses.png', to: { pathname: '/home' }, name: 'Roses and Guns', alt: 'second pic' },
		{ image: '/images/way.png', to: { pathname: '/home' }, name: 'The way back home', alt: 'third pic' },
		{ image: '/images/abracadabra.png', to: { pathname: '' }, name: 'Abracadabra', alt: 'fourth pic' },
	]

	const PrevBtn = (props) => {
		const { className, onClick } = props
		return (
			<div className={className} onClick={onClick}>
				<ArrowBackIosRoundedIcon className='arrows' />
			</div>
		)
	}

	const NextBtn = (props) => {
		const { className, onClick } = props
		return (
			<div className={className} onClick={onClick}>
				<div>
					<ArrowForwardIosRoundedIcon className='arrows' />
				</div>
			</div>
		)
	}

	// const renderInfo = (box, index) => {
	// 	return <img className='img' src={box.image} alt={box.alt} key={index} />
	// }

	return (
		<div className='main'>
			<h1>Basic Carousel</h1>

			<Slider autoplay autoplaySpeed={1000} dots initialSlide={0} prevArrow={<PrevBtn />} nextArrow={<NextBtn />}>
				{boxInfo.map((box, index) => (
					<TBox key={index} img={box.image} to={box.to} name={box.name} descr={box.alt} />
				))}
			</Slider>
		</div>
	)
}

export default Carousel

{
	/* <Slider autoplay autoplaySpeed={100} dots initialSlide={0} infinite={false}>
	autoplay for autoplay to change the speed in ms 
	just add the prop autoplaySpeed={in ms}
	dots allows you to have small dots down.
	initialSlide={the number of the image you want to start at. 0 to the last image you have}
	infinite false doesnt allow us to loop over when we reach the last image.

*/
}

{
	// CustomPaging is basically gonna allow us to change the style of the paging dots.
	// customPaging={(i) => {
	// 	return <div>{i + 1}</div>
	// }}
	// dotsClass='slick-dots CustomizeIndicatior'
}
