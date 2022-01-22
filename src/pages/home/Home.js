import Recommended from '../../components/Recommended/Recommended'
import Categories from '../../components/Categories/Categories'
import Write from '../../components/Write/Write'
import Container from '../../components/container/Container'

function Home({ handleLogout }) {
	return (
		<Container>
			<Recommended />
			<Categories />
			<Write />
		</Container>
	)
}

export default Home
