import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  reviewsOuterContainer: {
    display: 'grid',
    gridRow: 'auto auto auto',
    // justifyContent: 'space-between',
  },
  reviewsInnerContainer: {
    minHeight: '100px',
    width: '100%',
    overflowY: 'auto',
    borderTop: '1px solid #dbdbdb',
    marginRight: '30px',
  },
}));