import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/Sign'
import User from './pages/user/User'
import Adventure from './pages/CatPages/Adventure'
import './App.css'
import Horror from './pages/CatPages/Horror'
import Humour from './pages/CatPages/Humour.js'
import NonFiction from './pages/CatPages/NonFiction'
import Romance from './pages/CatPages/Romance'
import Create from './pages/Create/Create'

// import { AuthProvider } from './contexts/AuthContext'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' exact element={<LandingPage />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/user' element={<User />} />
				<Route path='/category/adventure' element={<Adventure />} />
				<Route path='/category/horror' element={<Horror />} />
				<Route path='/category/humour' element={<Humour />} />
				<Route path='/category/nonFiction' element={<NonFiction />} />
				<Route path='/category/romance' element={<Romance />} />
				<Route path='/Create' element={<Create />} />
			</Routes>
		</div>
	)
}

export default App
