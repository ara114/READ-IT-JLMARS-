import React, { useState, useEffect } from 'react'
import Container from '../../components/container/container'
import UserNav from '../../pages/user/UserNav'
import './Account.css'
import FileBase from 'react-file-base64'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/auth';

export default function Account() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('profile'));
	const names = user?.result?.name.split(' ');
	console.log(names);
	const [userData, setUserData] = useState({ image: user?.result?.image, firstName: names[0], lastName: names[1], categoryOne: user?.result?.categoryOne, categoryTwo: user?.result?.categoryTwo, bio: user?.result?.bio });

	const [currentId, setCurrentId] = useState(0);

	

	useEffect(() => {
		setCurrentId(user?.result?._id);
	}, [])
	


	function handleSubmit(event) {
		event.preventDefault()
		dispatch(updateUser(currentId, { ...userData, name: user?.result?.name }));
		localStorage.setItem('profile', JSON.stringify({ ...user, result: {...user?.result, name: `${userData.firstName} ${userData.lastName}`, bio: userData.bio, categoryOne: userData.categoryOne, categoryTwo: userData.categoryTwo}}));
		navigate('/user');
	}

	return (
		<Container nav={<UserNav />}>
			<div className='acc-container'>
				<div className='heading'>
					<h1>Account</h1>
				</div>
				<div className='form-div'>
					<form onSubmit={handleSubmit}>
						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>First Name </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='text' id='name' value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Last Name </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='text' id='name' value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Favorite Category1 </label>
							</aside>
							<div className='inp inp-inp'>
							<select name="favCategoryOne" id="favCategoryOne" value={userData.categoryOne} onChange={(e) => setUserData({ ...userData, categoryOne: e.target.value })}>
								<option value="Adventure">Adventure</option>
								<option value="Humour">Humour</option>
								<option value="Horror">Horror</option>
								<option value="Romance">Romance</option>
								<option value="Non-Fiction">Non-Fiction</option>
							</select>
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Favorite Category2 </label>
							</aside>
							<div className='inp inp-inp'>
								<select name="favCategoryTwo" id="favCategoryTwo" value={userData.categoryTwo} onChange={(e) => setUserData({ ...userData, categoryTwo: e.target.value })}>
									<option value="Adventure">Adventure</option>
									<option value="Humour">Humour</option>
									<option value="Horror">Horror</option>
									<option value="Romance">Romance</option>
									<option value="Non-Fiction">Non-Fiction</option>
								</select>
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='bio'>Bio </label>
							</aside>
							<div className='inp inp-inp'>
								<textarea id='bio' rows='5' value={userData.bio} onChange={(e) => setUserData({ ...userData, bio: e.target.value })}></textarea>
							</div>
						</div>

						<div>
							<button className='save-btn' type='submit' >Save Changes</button>
							
						</div>
					</form>
				</div>
			</div>
		</Container>
	)
}
