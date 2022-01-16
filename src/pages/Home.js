import { Button } from '../components/button/Button'

function Home({ handleLogout }) {
	return (
		<div>
			<Button onClick={handleLogout}>SignOut</Button>
		</div>
	)
}

export default Home
