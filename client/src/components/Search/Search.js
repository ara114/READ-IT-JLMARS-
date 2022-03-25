import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getStoriesBySearch} from '../../actions/stories';
import './Search.css'

const Search = () => {
    const [search, setSearch] = useState('');
    // console.log(query);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = () => {
      if(search.trim()){
        console.log(search);
        dispatch(getStoriesBySearch(search));
        navigate(`/search?searchQuery=${search || 'none'}`);
      }
      else{
        navigate('/home');
      }
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
          handleSubmit();
        }
    }
  return (
    <div className="search-container">
      <TextField
        name="search"
        variant="outlined"
        label="Search stories..."
        onKeyPress={handleKeyPress}
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <Button 
      variant="contained"
      style={{ backgroundColor: '#8e05c2', color: '#fff' }}
      onClick={() => {handleSubmit()}}><SearchIcon/></Button>
    </div>
  )
}

export default Search