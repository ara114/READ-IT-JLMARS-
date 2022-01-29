import { Routes, Route, Navigate } from 'react-router-dom'
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
import Join from './pages/Join/Join'
import About from './Settings/About/About'
import Account from './Settings/Account/Account'
import Security from './Settings/Security/Security'
import Settings from './Settings/Settings'
import {v4 as uuidV4} from 'uuid' 
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
				<Route
					path="/Create"
					element={<Navigate to= {`/Create/${uuidV4()}`} ><Create/></Navigate>}
				/>
				<Route path='/Create/:id' element={<Create />} />
				<Route path='/Join' element={<Join />} />
				<Route path="/settings" exact element={<Settings/>} /> 
				<Route path="/about" exact element={<About/>} />
				<Route path="/account" exact element={<Account/>} />
				<Route path="/security" exact element={<Security/>} />
				{/* <Route path="/logout" exact element={<Logout/>} /> */}
			</Routes>
		</div>
	)
}

export default App
