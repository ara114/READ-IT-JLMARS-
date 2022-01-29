import React, {useState, useEffect} from 'react';
import Container from '../../components/container/container';
import {TextField, Button, Typography, Paper, Grow} from '@material-ui/core';
import useStyles from './styles';
import { useNavigate} from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar';
const Create = () => {

  const classes = useStyles();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(code);
    navigate(`/Create/${code}`, { replace: true })
}

	return (
		<Container nav={<NavBar/>}>
      {/* {console.log(window.location.pathname)} */}
      <Grow in>
        <Paper className= {classes.paper}>
          <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                  Enter Room code: 
                </Typography>
                <TextField name="code" variant="outlined" label="Room code" fullWidth value={code} onChange={(e) => {setCode(e.target.value)}} required />
                <Button className={classes.buttonSubmit} variant="contained" style={{backgroundColor: "#8e05c2", color: "#fff"}} size="large" type="submit" >Join</Button>
            </form>
        </Paper>
      </Grow>

		</Container>
	)
};

export default Create;
