import Login from '../components/Login/Login'
import fire from '../fire'
import { useState, useEffect } from 'react'
import Home from '../pages/home/Home'

function LoginPage() {
	const [user, setUser] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [hasAccount, setHasAccount] = useState(true)

	const clearInputs = () => {
		setEmail('')
		setPassword('')
	}
	const ClearErrors = () => {
		setEmailError('')
		setPasswordError('')
	}

	const handleLogin = () => {
		ClearErrors()
		fire.auth()
			.singInWithEmailAndPassword(email, password)
			.catch((err) => {
				switch (err.code) {
					case 'auth/invalid-email':
					case 'auth/user-disabled':
					case 'auth/user-not-found':
						setEmailError(err.message)
						break
					case 'auth/wrong-password':
						setPasswordError(err.message)
						break
				}
			})
	}

	const handleSignup = () => {
		ClearErrors()
		fire.auth()
			.CreateUserWithEmailAndPassword(email, password)
			.catch((err) => {
				switch (err.code) {
					case 'auth/email-already-in-use':
					case 'auth/invalid-email':
						setEmailError(err.message)
						break
					case 'auth/weak-password':
						setPasswordError(err.message)
						break
				}
			})
	}

	const handleLogout = () => {
		fire.auth().signOut()
	}
	const authListener = () => {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				clearInputs()
				setUser(user)
			} else {
				setUser('')
			}
		})
	}
	useEffect(() => {
		authListener()
	}, [])

	return (
		<section>
			{user ? (
				<Home handleLogout={handleLogout}></Home>
			) : (
				<Login
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					handleLogin={handleLogin}
					handleSignup={handleSignup}
					hasAccount={hasAccount}
					setHasAccount={setHasAccount}
					emailError={emailError}
					passwordError={passwordError}
				></Login>
			)}
		</section>
	)
}

export default LoginPage
