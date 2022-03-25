import React, {useState, useRef} from 'react'
import { Typography, TextField, Button } from '@material-ui/core/';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { reviewStory } from '../../actions/stories';

const Reviews = ({story}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [reviews, setreviews] = useState(story?.reviews);
  const [review, setreview] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const reviewsRef = useRef();

  const handleSubmit = async () => {
    const finalreview = `${user?.result?.name}: ${review}`;
    const newreviews = await dispatch(reviewStory(finalreview, story.storyID));
    setreviews(newreviews);
    setreview('');

    reviewsRef.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className="reviewContainer">
      <div className={classes.reviewsOuterContainer}>
        <div className={classes.reviewsInnerContainer}>
        <Typography gutterBottom variant="h6"><strong>Reviews</strong></Typography>
          {reviews?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}:</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={reviewsRef}/>
        </div>
        <div style={{ width: '70%' }} className="writeReview">
          <Typography gutterBottom variant="h6">Write a Review</Typography>
          <TextField
            fullWidth
            rows={4}
            variant='outlined'
            label='Review'
            multiline={true}
            value={review}
            onChange={(e) => {setreview(e.target.value)}}
          />
          <Button style={{ marginTop: '10px'}} fullWidth disabled={!review} variant="contained" color="primary" onClick={handleSubmit} >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Reviews