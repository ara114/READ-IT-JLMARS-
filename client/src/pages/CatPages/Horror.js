import Container from '../../components/container/container'
import TBox from '../../components/Stories/TBox'
import './Cat.css'
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {getStories} from '../../actions/stories';
import {CircularProgress} from '@material-ui/core';
import NavBar from '../../components/navbar/NavBar';
function Horror() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);
	const stories = useSelector((state)=> state.stories);
	console.log(stories);

	return (
		!stories.length ? <CircularProgress/> : (
			<Container nav={<NavBar/>}>
				<h1>Horror</h1>
				<div className='cat-container'>
					{stories.map((story) => (
						story.category === 'Horror' && (<TBox key={story._id} img={story.image} to={`/${story.storyID}`} name={story.title} />)
					))}
				</div>
			</Container>
		)

		
	)
}

export default Horror

// const styles = {
//   tabs: {
//     background: '#fff',
//   },
//   slide: {
//     padding: 15,
//     minHeight: 100,
//     color: '#fff',
//   },
//   slide1: {
//     backgroundColor: '#FEA900',
//   },
//   slide2: {
//     backgroundColor: '#B3DC4A',
//   },
//   slide3: {
//     backgroundColor: '#6AC0FF',
//   },
// };

// class Adventure extends React.Component {
//   state = {
//     index: 0,
//   };

//   handleChange = (event, value) => {
//     this.setState({
//       index: value,
//     });
//   };

//   handleChangeIndex = index => {
//     this.setState({
//       index,
//     });
//   };

//   render() {
//     const { index } = this.state;

//     return (
//       <div>
//         <Tabs value={index} fullWidth centered onChange={this.handleChange} style={styles.tabs}>
//           <Tab label="tab n°1" />
//           <Tab label="tab n°2" />
//           <Tab label="tab n°3" />
//         </Tabs>
//         <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} enableMouseEvents>
//           <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
//           <div style={Object.assign({}, styles.slide, styles.slide2)}>
//             slide n°2
//             <Select value={10} autoWidth={false}>
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               <MenuItem value={10}>Ten</MenuItem>
//             </Select>
//           </div>
//           <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
//         </SwipeableViews>
//       </div>
//     );
//   }
// }

// export default Adventure
