import React, { useRef } from 'react'
import Container from '../../components/container/container'
import UserNav from '../../pages/user/UserNav'
import './Account.css'
import FileBase from 'react-file-base64'

export default function Account() {
	const nameInput = useRef()
	const userNameInput = useRef()
	const emailInput = useRef()
	const dobInput = useRef()
	const bioInput = useRef()

	function handleSubmit(event) {
		event.preventDefault()
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
							<label htmlFor='name'>Profile Picture </label>
						</aside>
						<FileBase type='file' multiple={false} onDone={({ base64 }) => base64} required />
						</div>
						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>First Name </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='text' id='name' ref={nameInput} />
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Last Name </label>
							</aside>
							<div className='inp inp-inp'>
								<input type='text' id='name' ref={nameInput} />
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Favorite Category1 </label>
							</aside>
							<div className='inp inp-inp'>
							<select name="favCategoryOne" id="favCategoryOne">
								<option value="adventure">Adventure</option>
								<option value="humour">Humour</option>
								<option value="horror">Horror</option>
								<option value="romance">Romance</option>
								<option value="nonFiction">Non-Fiction</option>
							</select>
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='name'>Favorite Category2 </label>
							</aside>
							<div className='inp inp-inp'>
								<select name="favCategoryTwo" id="favCategoryTwo">
									<option value="adventure">Adventure</option>
									<option value="humour">Humour</option>
									<option value="horror">Horror</option>
									<option value="romance">Romance</option>
									<option value="nonFiction">Non-Fiction</option>
								</select>
							</div>
						</div>

						<div className='input'>
							<aside className='inp inp-label'>
								<label htmlFor='bio'>Bio </label>
							</aside>
							<div className='inp inp-inp'>
								<textarea id='bio' rows='5' ref={bioInput}></textarea>
							</div>
						</div>

						<div>
							<button className='save-btn'>Save Changes</button>
						</div>
					</form>
				</div>
			</div>
		</Container>
	)
}
