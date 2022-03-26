import React, { useEffect } from 'react';
import Container from '../../components/container/container';
import NavBar from '../../components/navbar/NavBar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../actions/auth';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CarouselUser from '../../components/carouselUser/CarouselUser';

const Profile = () => {
  const { id: userID } = useParams();
  const dispatch = useDispatch();
  

  useEffect(() => {
		dispatch(getUser(userID));
	}, []);

  const state = useSelector(state => {
		return state.authReducer;
	});

  const {otherUser} = state;
  // console.log(otherUser);

  const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

  
  return (
    <Container nav={<NavBar />}>
        <div className='gridCont'>
						<div className='gridCont11'>
							<div className='avatar_wrap'>
								<Avatar className='avatar'
									style={{ height: '150px', width: '150px' }}
									alt={otherUser.name}
									src={otherUser.image}
								>
									{otherUser.name.charAt(0)}
								</Avatar>
							</div>
						</div>
						<div className='gridCont12'>
							<div className='userName'> {otherUser.name}</div>
							<div className='bio'>
								<p className='biograph'>{otherUser.bio}</p>
							</div>
								<div className='userFavoriteBtns'>
								<p className='favCat'>Favorite Categories:</p>
									<Link to={`/category/${otherUser.categoryOne}`} className='userCatBtns' onClick={scrollToTop}>
										{otherUser.categoryOne}
									</Link>
									<Link to={`/category/${otherUser.categoryTwo}`} className='userCatBtns' onClick={scrollToTop}>
										{otherUser.categoryTwo}
									</Link>
						</div>
						</div>

						{/* <div className='user-container2'></div> */}
			</div>
			<div className='likedStories'>
				<label>Liked Stories</label>
				<CarouselUser user={otherUser}/>
			</div>
    </Container>
  )
}

export default Profile