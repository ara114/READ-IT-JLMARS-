import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  reviewsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  reviewsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
}));