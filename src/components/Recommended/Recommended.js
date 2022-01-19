import './Recommended.css'
import LWrap from '../../components/Boxes/LWrap'
import Swipe from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const Recommended = () => {
	const WithAutoPlayProps = autoPlay(Swipe)

	return (
		<div className='recommended-header'>
			Recommended
			<LWrap />
			{/* <WithAutoPlayProps>
				<LWrap />
				<Sbox />
			</WithAutoPlayProps> */}
		</div>
	)
}
export default Recommended
