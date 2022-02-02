import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {getStories} from '../../actions/stories';
import NavBar from '../../components/navbar/NavBar';
import Container from '../../components/container/container';
import {Link} from 'react-router-dom';
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import './Read.css';
const Read = () => {
    const { id: storyId } = useParams()
    // console.log(storyId)
    const dispatch = useDispatch();
    useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	const stories = useSelector((state)=> state.stories);
  return (
    <Container nav={<NavBar/>}>
        {/* <div className="read"> */}
            {stories.map((storyy) => (
                storyy.storyID === `${storyId}` && 
                (
                <div key={storyy._id} className="read-container">
                    
                    <img src={storyy.image} alt={`${storyy.title}`}/>
                    <div className="read-title">{storyy.title}</div>
                    {JSON.stringify(storyy.story)}
                </div>
                )
            ))}
        {/* </div> */}
    </Container>
  );
};

export default Read;
