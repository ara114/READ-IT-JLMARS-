import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

var firebaseConfig = {
	apiKey: 'AIzaSyAxfbaV_gQxLNb-ZLIeW3X-x4fDv8v1apY',
	authDomain: 'read-it-58194.firebaseapp.com',
	projectId: 'read-it-58194',
	storageBucket: 'read-it-58194.appspot.com',
	messagingSenderId: '451189266661',
	appId: '1:451189266661:web:aca28195adbb2b91469c0c',
	measurementId: 'G-922LZ2VDML',
}

const fire = firebase.initializeApp(firebaseConfig)
export default fire
