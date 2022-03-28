import React, { useEffect } from 'react';
import Container from '../../components/container/container';
import NavBar from '../../components/navbar/NavBar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/auth';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LikedCarousel from '../../components/LikedCarousel/LikedCarousel';
import YourStoriesCarousel from '../../components/YourStoriesCarousel/YourStoriesCarousel';

const Profile = () => {
  const { id: userID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
		dispatch(getUsers());
	}, []);

  const state = useSelector(state => {
		return state.authReducer;
	});
	
  console.log('state', state);
  const {otherUsers} = state;
  console.log(otherUsers);

  let other = null;
  if(otherUsers)
   other = otherUsers.filter(user => user._id === userID);
  let otherUser = null;
  if(other) 
  	otherUser = other[0];

  const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

  
  return (
    <Container nav={<NavBar />}>
		{otherUser ? 
			<>
				<div className='gridCont'>
					<div className='gridCont11'>
						<div id= "noblur" className='avatar_wrap'>
							<Avatar id= "noblur" className='avatar'
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
				</div>
				<div className='yourStories'>
					<label>{`${otherUser.name.substring(0, otherUser.name.indexOf(" "))}'s Stories`}</label>
					<YourStoriesCarousel user={otherUser} />
				</div>
				<div className='likedStories'>
					<label>{`${otherUser.name.substring(0, otherUser.name.indexOf(" "))}'s Liked Stories`}</label>
					<LikedCarousel user={otherUser}/>
				</div>
			</> : 
			<>
				<div className='gridCont'>
					<div className='gridCont11'>
						<div id= "noblur" className='avatar_wrap'>
							<Avatar id= "noblur" className='avatar'
								style={{ height: '150px', width: '150px' }}
							>
							</Avatar>
						</div>
					</div>
					<div className='gridCont12'>
						<div className='userName'> User not found</div>
						<div className='bio'>
							<p className='biograph'></p>
						</div>
						<div className='userFavoriteBtns'>
							<p className='favCat'>Favorite Categories:</p>
						</div>
					</div>
				</div>
				<div className='yourStories'>
				</div>
				<div className='likedStories'>
				</div>
			</>
		}

    </Container>
  )
}

export default Profile