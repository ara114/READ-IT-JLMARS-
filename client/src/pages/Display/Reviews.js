import React, {useState, useRef} from 'react'
import { Typography, TextField, Button } from '@material-ui/core/';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { commentStory } from '../../actions/stories';

const Reviews = ({story}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [comments, setComments] = useState(story?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentsRef = useRef();

  const handleSubmit = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    const newComments = await dispatch(commentStory(finalComment, story.storyID));
    setComments(newComments);
    setComment('');

    commentsRef.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className="reviewContainer">
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant="h6"><strong>Reviews</strong></Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}:</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef}/>
        </div>
        <div style={{ width: '70%' }} className="writeReview">
          <Typography gutterBottom variant="h6">Write a Review</Typography>
          <TextField
            fullWidth
            rows={4}
            variant='outlined'
            label='Review'
            multiline={true}
            value={comment}
            onChange={(e) => {setComment(e.target.value)}}
          />
          <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleSubmit} >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Reviews