export default (stories = [], action) => {
    switch(action.type) {
        case 'DELETE':
            return stories.filter((story) => story.storyID !== action.payload);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...stories, action.payload];
        default:
            return stories;
    }
}