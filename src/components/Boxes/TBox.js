import './TBox.css'
import { Link } from 'react-router-dom'
function TBox(props) {
	return (
		<li className='item'>
			<Link className='link' to={props.to}>
				<figure className='pictureWrap'>
					<img src={props.img} alt={props.alt} className='image' />
				</figure>
				<h5 className='name'>{props.name}</h5>
			</Link>
		</li>
	)
}

export default TBox
