import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {getStories} from '../../actions/stories';
import NavBar from '../../components/navbar/NavBar';
import Container from '../../components/container/container'
const Read = () => {
    const { id: storyId } = useParams()
    console.log(storyId)
    const dispatch = useDispatch();
    useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	const stories = useSelector((state)=> state.stories);
  return (
    <Container nav={<NavBar/>}>
        <div  className="read-container">
            {stories.map((story) => (
                story.storyID === `${storyId}` && 
                (<div key={story._id}>
                    {story.title}
                    <img src={story.image} alt={`${story.title}`}/>
                </div>)
            ))}
        </div>
    </Container>
  );
};

export default Read;
