import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getStories } from '../../actions/stories'
import Container from '../../components/container/container'
import UserNav from '../user/UserNav'
import { Avatar } from '@material-ui/core'
import CarouselUser from '../../components/carouselUser/CarouselUser'
import './User.css'
import FileBase from 'react-file-base64'
import { updateUser } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'
// import '../../components/Categories/Categories.css'

import { Link } from 'react-router-dom'

function User() {
	const navigate = useNavigate()
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
	const names = user?.result?.name.split(' ')
	console.log(names)
	const [userData, setUserData] = useState({
		image: '',
		firstName: names[0],
		lastName: names[1],
		categoryOne: user?.result?.categoryOne,
		categoryTwo: user?.result?.categoryTwo,
		bio: user?.result?.bio,
	})
	const [isEdit, setIsEdit] = useState(false)
	const [currentId, setCurrentId] = useState(0)
	useEffect(() => {
		const token = user?.token

		setUser(JSON.parse(localStorage.getItem('profile')))
	}, [])

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStories())
	}, [dispatch])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<Container nav={<UserNav user={user} setUser={setUser} setCurrentId={setCurrentId} />}>
			<div className='gridCont'>
				{isEdit ? (
					//First Element
					<div className='editProfilePic'>
						<FileBase type='file' multiple={false} onDone={({ base64 }) => setUserData({ ...userData, image: base64 })} required />
						<button
							onClick={() => {
								localStorage.setItem('profile', JSON.stringify({ ...user, result: { ...user?.result, image: userData.image } }))
								dispatch(updateUser(user?.result?._id, { ...userData, name: user?.result?.name }))
								setIsEdit(false)
								navigate('/user')
							}}
						>
							Upload
						</button>
					</div>
				) : (
					<>
						<div className='gridCont11'>
							<div>
								<Avatar
									style={{ height: '100px', width: '100px', background: '#8e05c2' }}
									alt={user?.result.name}
									src={user?.result.image}
								>
									{user?.result.name.charAt(0)}
								</Avatar>
								<button onClick={() => setIsEdit(true)}>Edit</button>
							</div>

							<div className='userName'> {user?.result.name}</div>
						</div>
						<div className='gridCont12'>
							<div className='bio'>
								Bio:
								<p>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
									standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
									type specimen book. It has survived not only five centuries,but also the leap into electronic typesetting,
									remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
									Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
									of Lorem Ipsum.
								</p>
							</div>
						</div>
						<div className='gridCont13'>
							<p></p>
							<div className='category-header'>
								Favorite Categories:
								<div className='userFavoriteBtns'>
									<Link to={`/category/${user?.result?.categoryOne}`} className='nostyle categories' onClick={scrollToTop}>
										{user?.result?.categoryOne}
									</Link>
									<Link to={`/category/${user?.result?.categoryTwo}`} className='nostyle categories' onClick={scrollToTop}>
										{user?.result?.categoryTwo}
									</Link>
								</div>
							</div>
						</div>
						{/* <div className='user-container2'></div> */}
					</>
				)}
			</div>
			<div className='likedStories'>
				<label>Liked Stories</label>
				<CarouselUser />
			</div>
		</Container>
	)
}

export default User
