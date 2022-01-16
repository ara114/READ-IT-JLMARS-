import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import './App.css'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' exact element={<LandingPage />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</div>
	)
}

export default App
