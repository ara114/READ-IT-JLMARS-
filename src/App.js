import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/Sign'
import User from './pages/user/User'
import Adventure from './pages/Adventure/Adventure'
import Horror from './pages/Horror/Horror'
import Humour from './pages/Humour/Humour'
import NonFiction from './pages/NonFiction/NonFiction'
import Romance from './pages/Romance/Romance'
import './App.css'
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
				<Route path='/category/Adventure' element={<Adventure />} />
				<Route path='/category/Horror' element={<Horror />} />
				<Route path='/category/Humour' element={<Humour />} />
				<Route path='/category/NonFiction' element={<NonFiction />} />
				<Route path='/category/Romance' element={<Romance />} />
			</Routes>
		</div>
	)
}

export default App
