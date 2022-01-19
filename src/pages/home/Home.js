import Navbar from '../../components/navbar/NavBar';
import Recommended from '../../components/Recommended/Recommended';
import Categories from '../../components/Categories/Categories';
import Write from '../../components/Write/Write';
import Footer from '../../components/Footer/Footer';
import Container from '../../components/container/container'

function Home({ handleLogout }) {
	return (
        <Container>
            <Recommended/>
            <Categories/>
            <Write/>
        </Container>
	)
}

export default Home
