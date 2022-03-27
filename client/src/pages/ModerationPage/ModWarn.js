import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { warnAuthor } from '../../actions/auth'
import ModNav from './Components/ModNav'
import Container from '../../components/container/container'
import { useSelector, useDispatch } from 'react-redux'
import useStyles from './styles'
import { TextField, Button, Typography, Paper, Grow } from '@material-ui/core'

const ModWarn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id: storyId } = useParams();
    const stories = useSelector((state) => state.stories);
    const classes = useStyles();
    const story = stories.find(story => story.storyID === storyId)
    const [formData, setFormData] = useState(
        {
            title: `Warning for ${story.title}`, 
            message: ''
        })

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(warnAuthor(story, formData, navigate));
    }

    const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

  return (
    <Container contentClass={'content'} nav={<ModNav />}>
        <div>
            <Grow in>
                <Paper className={classes.paper}>
                <form autoComplete='off' className={`${classes.root} ${classes.form} createForm`} onSubmit={(e) => {handleSubmit(e);}}>
                    <Typography variant='h5'><strong>Warn Author</strong></Typography>
                    <TextField
                        name='title'
                        variant='outlined'
                        label='Title'
                        fullWidth
                        size='small'
                        value={formData.title}
                        disabled
                        required
                    />
                    <TextField
                        name='message'
                        variant='outlined'
                        label='Message'
                        fullWidth
                        multiline
                        rows={10}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        className={classes.buttonSubmit}
                        variant='contained'
                        style={{ backgroundColor: '#8e05c2', color: '#fff' }}
                        size='large'
                        type='submit'
                        fullWidth
                    >
                        Send Warning
                    </Button>
                </form>
                </Paper>
            </Grow>
        </div>
    </Container>
  )
}

export default ModWarn