import './Recommended.css'
import '../Line.css'
import Carousel from '../carousel/Carousel'
const Recommended = () => {
	return (
		<div className='recommended-header'>
			<br></br>
			Recommended
			{/* <hr className='line' /> */}
			<Carousel />
		</div>
	)
}
export default Recommended