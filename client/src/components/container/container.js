import Navbar from '../navbar/NavBar'
import Footer from '../Footer/Footer'
import './Container.css'

function Container(props) {
	return (
		<div className='common'>
			<div className='container'>
				{props.nav}
				<div className={`content ${props.contentClass}`}>{props.children}</div>
			</div>
			<Footer />
		</div>
	)
}

export default Container
